<docs>
	# 进度环
</docs>

<script setup lang="ts">
	const props = withDefaults(defineProps<{
		/** 加载完成并隐藏？ */
		hidden?: boolean;
		/** 指示进度条的最大值。 */
		max?: number;
		/** 进度值，留空表示不定状态。 */
		value?: number | undefined;
	}>(), {
		max: 100,
		value: NaN,
	});

	const indeterminate = computed(() => !Number.isFinite(props.value));
	const shown = computed(() => !props.hidden);
	const toDeterminate = ref(false);

	watch(indeterminate, async (curInd, prevInd) => {
		if (prevInd && !curInd) { // 当从不定状态到定值状态时增加一个动画，但反之则不会。
			toDeterminate.value = true;
			await delay(250);
			toDeterminate.value = false;
		}
	});
</script>

<template>
	<Transition :duration="250">
		<Comp v-if="shown" role="progressbar" :aria-busy="shown">
			<template v-if="indeterminate">
				<div class="layer-wrapper">
					<div class="layer">
						<div class="circle-clipper left">
							<div class="circle"></div>
						</div>
						<div class="gap-patch">
							<div class="circle"></div>
						</div>
						<div class="circle-clipper right">
							<div class="circle"></div>
						</div>
					</div>
				</div>
				<Icon name="refresh" />
			</template>
			<svg
				v-else
				class="ring"
				:class="{ 'to-determinate': toDeterminate }"
				:style="{ '--progress': value / max }"
			>
				<circle />
			</svg>
		</Comp>
	</Transition>
</template>

<style scoped lang="scss">
	$layer-animation-options: cubic-bezier(0.4, 0, 0.2, 1) infinite both;

	@layer props {
		:comp {
			/// 进度环尺寸大小。
			--size: 40px;
			/// 进度环边缘线条粗细。
			--thickness: 4px;
			/// 颜色。
			color: c(accent);
		}
	}

	:comp {
		@include square(var(--size));
		position: relative;
		display: inline-block;
		contain: strict;
		line-height: 0;

		&.v-leave-active * {
			transition-timing-function: $ease-in-cubic;
		}

		&.v-enter-from,
		&.v-leave-to {
			// stylelint-disable-next-line length-zero-no-unit
			--thickness: 0px !important; // 如果去掉 px 则会行为异常。
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.layer-wrapper {
			display: none;

			+ .icon {
				display: block;
			}
		}
	}

	.layer-wrapper {
		@include square(100%);
		animation: spinner 1568ms linear infinite;

		+ .icon {
			display: none;
			color: currentColor;
			scale: 1.5;

			&,
			:deep(*) {
				@include square(100%);
			}
		}
	}

	.layer {
		@include square(100%);
		position: absolute;
		border-color: currentColor;
		opacity: 1;
		animation: layer-fill-unfill-rotate 5332ms $layer-animation-options;
	}

	.gap-patch {
		position: absolute;
		top: 0;
		left: 45%;
		width: 10%;
		height: 100%;
		overflow: clip;
		border-color: inherit;

		.circle {
			left: -450%;
			box-sizing: border-box;
			width: 1000%;
		}
	}

	.circle-clipper {
		$circle-animation-options: 1333ms $layer-animation-options;

		position: relative;
		display: inline-block;
		width: 50%;
		height: 100%;
		overflow: clip;
		border-color: inherit;

		.circle {
			@include circle;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			box-sizing: border-box;
			width: 200%;
			height: 100%;
			border-width: var(--thickness);
			border-style: solid;
			border-color: inherit;
			border-bottom-color: transparent !important;
			animation: none;

			&.v-enter-from,
			&.v-leave-to {
				border: 0 solid;
			}
		}

		&.left {
			float: left;

			.circle {
				left: 0;
				border-right-color: transparent !important;
				rotate: 129deg;
				animation: left-spin $circle-animation-options;
			}
		}

		&.right {
			float: right;

			.circle {
				left: -100%;
				border-left-color: transparent !important;
				rotate: -129deg;
				animation: right-spin $circle-animation-options;
			}
		}
	}

	.ring {
		@include square(var(--size));
		--progress: 0;
		overflow: visible;
		rotate: -100grad;

		circle {
			--center: calc(var(--size) / 2);
			--radius: calc(var(--center) - var(--thickness) / 2);
			--dash-array: calc(2 * #{math.$pi} * var(--radius));
			fill: transparent;
			stroke: currentColor;
			stroke-dasharray: var(--dash-array);
			stroke-dashoffset: calc(var(--dash-array) * (1 - var(--progress)));
			stroke-linecap: round;
			stroke-width: var(--thickness);
			cx: var(--center);
			cy: var(--center);
			r: var(--radius);
		}

		&.to-determinate circle {
			animation: to-determinate-scale 250ms $ease-out-smooth;
		}
	}

	@keyframes spinner {
		to {
			rotate: 1turn;
		}
	}

	@keyframes layer-fill-unfill-rotate {
		$length: 8;

		@for $i from 1 through 8 {
			#{calc(100% / $length) * $i} {
				rotate: calc(3turn / $length) * $i;
			}
		}
	}

	@keyframes layer-1-fade-in-out {
		0%,
		25%,
		90%,
		100% {
			opacity: 1;
		}

		26%,
		89% {
			opacity: 0;
		}
	}

	@keyframes layer-2-fade-in-out {
		0%,
		15%,
		51% {
			opacity: 0;
		}

		25%,
		50% {
			opacity: 1;
		}
	}

	@keyframes layer-3-fade-in-out {
		0%,
		40%,
		76% {
			opacity: 0;
		}

		50%,
		75% {
			opacity: 1;
		}
	}

	@keyframes layer-4-fade-in-out {
		0%,
		65%,
		100% {
			opacity: 0;
		}

		75%,
		90% {
			opacity: 1;
		}
	}

	@keyframes left-spin {
		0%,
		100% {
			rotate: 130deg;
		}

		50% {
			rotate: -5deg;
		}
	}

	@keyframes right-spin {
		0%,
		100% {
			rotate: -130deg;
		}

		50% {
			rotate: 5deg;
		}
	}

	@keyframes to-determinate-scale {
		from {
			stroke-dashoffset: 0;
		}
	}
</style>
