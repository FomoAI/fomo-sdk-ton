export interface IMonitorItem {
  title: string | JSX.Element
  value: string | JSX.Element
  className?: string
  isActive?: boolean
  onClick?: () => void
}

export interface IMonitorItemWithProgress
  extends IMonitorItem {
  value: string | number
}
