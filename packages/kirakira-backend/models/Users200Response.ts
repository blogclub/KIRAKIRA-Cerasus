/**
 * Kirakira Backend API
 * The API for Kirakira
 *
 * OpenAPI spec version: 0.0.1
 * Contact: horahora1567@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Videos200ResponsePaginationData } from '../models/Videos200ResponsePaginationData';
import { Videos200ResponseVideosInner } from '../models/Videos200ResponseVideosInner';
import { HttpFile } from '../http/http';

export class Users200Response {
    'paginationData'?: Videos200ResponsePaginationData;
    'userID'?: number;
    'username'?: string;
    'profilePictureURL'?: string;
    'videos'?: Array<Videos200ResponseVideosInner>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "paginationData",
            "baseName": "PaginationData",
            "type": "Videos200ResponsePaginationData",
            "format": ""
        },
        {
            "name": "userID",
            "baseName": "UserID",
            "type": "number",
            "format": ""
        },
        {
            "name": "username",
            "baseName": "Username",
            "type": "string",
            "format": ""
        },
        {
            "name": "profilePictureURL",
            "baseName": "ProfilePictureURL",
            "type": "string",
            "format": ""
        },
        {
            "name": "videos",
            "baseName": "Videos",
            "type": "Array<Videos200ResponseVideosInner>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return Users200Response.attributeTypeMap;
    }

    public constructor() {
    }
}

