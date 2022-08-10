export interface searchProperties {
	language: string,
	sortBy: SortBy,
	period: Period,
	vodType: VodType
}

export type SortBy = 'time' | 'views' | 'trending'
export type Period = 'all' | 'day' | 'week' | 'month'
export type VodType = 'all' | 'upload' | 'archive' | 'highlight'