/**
 * Either `data` or `path` is required
 */
export interface DataOrPathPropsSchema {
    /**
     * URL or relative path
     *
     * @example 'https://onedrives.com/myimg.png` // retrieve image via URL
     * @example '/home/gitbrent/images/myimg.png` // retrieve image via local path
     */
    path?: string

    /**
     * base64-encoded string
     * - Useful for avoiding potential path/server issues
     *
     * @example 'image/png;base64,iVtDafDrBF[...]=' // pre-encoded image in base-64
     */
    data?: string
}
