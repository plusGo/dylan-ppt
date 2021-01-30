// used by: image, object, text,
export interface HyperLinkPropsSchema {
    _rId: number
    /**
     * Slide number to link to
     */
    slide?: number
    /**
     * Url to link to
     */
    url?: string
    /**
     * Hyperlink Tooltip
     */
    tooltip?: string
}
