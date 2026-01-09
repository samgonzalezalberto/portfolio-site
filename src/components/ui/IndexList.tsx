import type { HTMLAttributes, ReactNode } from 'react'

type IndexListProps = {
  children: ReactNode
  as?: 'ul' | 'ol' | 'div' | 'section'
  className?: string
} & HTMLAttributes<HTMLElement>

type IndexListItemProps = {
  children: ReactNode
  meta?: ReactNode
  as?: 'li' | 'div' | 'article'
  className?: string
  metaClassName?: string
  contentClassName?: string
} & HTMLAttributes<HTMLElement>

function IndexListBase({
  children,
  as: Component = 'ul',
  className,
  ...rest
}: IndexListProps) {
  const classes = [
    'flex flex-col',
    'border-t border-muted',
    'divide-y divide-muted',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}

function IndexListItem({
  children,
  meta,
  as: Component = 'li',
  className,
  metaClassName,
  contentClassName,
  ...rest
}: IndexListItemProps) {
  const classes = ['py-6', className].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...rest}>
      <div className="grid grid-cols-swiss gap-gutter">
        <div className={['col-span-12 md:col-span-3', metaClassName].filter(Boolean).join(' ')}>
          {meta}
        </div>
        <div
          className={[
            'col-span-12 md:col-span-9',
            'min-w-0',
            contentClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </div>
    </Component>
  )
}

export const IndexList = Object.assign(IndexListBase, {
  Item: IndexListItem,
})
