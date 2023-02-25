/**
 * 移除指定 DOM 元素正在进行的所有动画。
 * @param elements - HTML DOM 元素。
 * @returns 是否有移除动画。
 */
export function removeExistAnimations(...elements: Element[]) {
	let hasExistAnimations = false;
	for (const element of elements) {
		const existAnimations = element.getAnimations();
		if (existAnimations.length !== 0) {
			hasExistAnimations = true;
			existAnimations.forEach(animation => animation.cancel());
		}
	}
	return hasExistAnimations;
}

/**
 * 等待下一时刻 CSS 动画更新刷新。
 * @returns 空承诺。
 */
export function nextAnimationTick() {
	return new Promise<void>(resolve => {
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				resolve();
			});
		});
	});
}

/**
 * 重播 CSS 动画。
 * @param element - HTML DOM 元素。
 * @param className - 具有动画的 CSS 类名。
 */
export async function replayAnimation(element: Element, ...className: string[]) {
	element.classList.remove(...className);
	await nextAnimationTick();
	element.classList.add(...className);
}

type StyleProperties = string & keyof FilterValueType<CSSStyleDeclaration, string>;
type Keyframes = Partial<Record<Exclude<StyleProperties, "offset">, string | number>>[];
type DimensionAxis = "height" | "width" | "both";

/**
 * 当宽/高度值设为 auto 时的动画宽/高度。
 * @param element - HTML DOM 元素。
 * @param changeFunc - 使宽/高度将会改变的回调函数。
 * @returns 动画异步承诺。
 */
export async function animateSize(
	element: Element,
	changeFunc: (() => void | Promise<void>) | undefined | null,
	{
		startHeight,
		endHeight,
		startWidth,
		endWidth,
		duration = 250,
		easing = eases.easeOutSmooth,
		specified = "both",
		withoutAdjustPadding,
		getSize,
	}: Partial<{
		/** 显式指定初始高度（可选）。 */
		startHeight: number;
		/** 显式指定结束高度（可选）。 */
		endHeight: number;
		/** 显式指定初始宽度（可选）。 */
		startWidth: number;
		/** 显式指定结束宽度（可选）。 */
		endWidth: number;
		/** 动画时间。 */
		duration: number;
		/** 动画运动曲线。默认为：平滑缓出。 */
		easing: string;
		/** 显式指定需要动画的是哪个方向。 */
		specified: DimensionAxis;
		/** 指定**不**需要动画调整哪个方向的内/外边距值。 */
		withoutAdjustPadding: DimensionAxis;
		/** 获取最终的元素尺寸。 */
		getSize: [number, number];
	}>,
): Promise<Animation | void> {
	startHeight ??= element.clientHeight;
	startWidth ??= element.clientWidth;
	await changeFunc?.();
	endHeight ??= element.clientHeight;
	endWidth ??= element.clientWidth;
	if (getSize)
		[getSize[0], getSize[1]] = [endWidth, endHeight];
	let isHeightChanged = specified === "height" || specified === "both",
		isWidthChanged = specified === "width" || specified === "both";
	if (startHeight === endHeight) isHeightChanged = false; // 不用动了。
	if (startWidth === endWidth) isWidthChanged = false;
	if (!isHeightChanged && !isWidthChanged) return;
	const keyframes = [{}, {}] as Keyframes;
	if (isHeightChanged) [keyframes[0].height, keyframes[1].height] = [startHeight + "px", endHeight + "px"];
	if (isWidthChanged) [keyframes[0].width, keyframes[1].width] = [startWidth + "px", endWidth + "px"];
	let setYPaddingIndex: number | undefined, setXPaddingIndex: number | undefined;
	if (startHeight === 0) setYPaddingIndex = 0;
	if (endHeight === 0) setYPaddingIndex = 1;
	if (startWidth === 0) setXPaddingIndex = 0;
	if (endWidth === 0) setXPaddingIndex = 1;
	const setXPadding = withoutAdjustPadding === undefined || withoutAdjustPadding === "height",
		setYPadding = withoutAdjustPadding === undefined || withoutAdjustPadding === "width";
	if (setXPadding && isHeightChanged && setYPaddingIndex !== undefined)
		Object.assign(keyframes[setYPaddingIndex], { paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 });
	if (setYPadding && isWidthChanged && setXPaddingIndex !== undefined)
		Object.assign(keyframes[setXPaddingIndex], { paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 });
	return element.animate(keyframes, { duration, easing }).finished;
}
