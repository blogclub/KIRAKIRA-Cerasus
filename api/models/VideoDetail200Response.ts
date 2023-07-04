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

import { HttpFile } from '../http/http';

export class VideoDetail200Response {
    'title'?: string;
    'mPDLoc'?: string;
    'views'?: number;
    'rating'?: number;
    'videoID'?: number;
    'authorID'?: number;
    'username'?: string;
    'userDescription'?: string;
    'videoDescription'?: string;
    'userSubscribers'?: number;
    'profilePicture'?: string;
    'uploadDate'?: string;
    'comments'?: any;
    'tags'?: Array<string>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "title",
            "baseName": "Title",
            "type": "string",
            "format": ""
        },
        {
            "name": "mPDLoc",
            "baseName": "MPDLoc",
            "type": "string",
            "format": ""
        },
        {
            "name": "views",
            "baseName": "Views",
            "type": "number",
            "format": ""
        },
        {
            "name": "rating",
            "baseName": "Rating",
            "type": "number",
            "format": ""
        },
        {
            "name": "videoID",
            "baseName": "VideoID",
            "type": "number",
            "format": ""
        },
        {
            "name": "authorID",
            "baseName": "AuthorID",
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
            "name": "userDescription",
            "baseName": "UserDescription",
            "type": "string",
            "format": ""
        },
        {
            "name": "videoDescription",
            "baseName": "VideoDescription",
            "type": "string",
            "format": ""
        },
        {
            "name": "userSubscribers",
            "baseName": "UserSubscribers",
            "type": "number",
            "format": ""
        },
        {
            "name": "profilePicture",
            "baseName": "ProfilePicture",
            "type": "string",
            "format": ""
        },
        {
            "name": "uploadDate",
            "baseName": "UploadDate",
            "type": "string",
            "format": ""
        },
        {
            "name": "comments",
            "baseName": "Comments",
            "type": "any",
            "format": ""
        },
        {
            "name": "tags",
            "baseName": "Tags",
            "type": "Array<string>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return VideoDetail200Response.attributeTypeMap;
    }

    public constructor() {
    }
}

