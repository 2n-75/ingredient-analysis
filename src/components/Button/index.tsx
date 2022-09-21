import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEventHandler } from 'react'
import { css } from '@emotion/css'
import { Colors } from '@/styles/colors'

export type Props = {
  children: string
  as?: React.ElementType<JSX.IntrinsicElements['button'] | JSX.IntrinsicElements['a']>
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

export const Button: FC<Props> = ({ children, as: Tag = 'button', ...attr }) => (
  <Tag className={styles.button} {...attr} type={Tag === 'button' ? (attr.type ? attr.type : 'button') : attr.type}>
    {children}
  </Tag>
)
const styles = {
  button: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 8px 16px;
    background: ${Colors.primary};
    color: white;
    border-radius: 3px;
    font-weight: 700;
    text-align: center;
    transition: all 0.2s;
    &:hover {
      background: ${Colors.link};
    }
  `,
}
