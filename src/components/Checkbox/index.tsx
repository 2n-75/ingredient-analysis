import { Colors } from '@/styles/colors'
import { css } from '@emotion/css'
import { FC } from 'react'

export type Props = {
  children: string
  onChange: () => void
}
export const Checkbox: FC<Props> = ({ children, onChange }) => (
  <label className={styles.label}>
    <input type="checkbox" className={styles.input} onChange={onChange} />
    <span className={styles.text}>{children}</span>
  </label>
)

const styles = {
  label: css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  input: css`
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    width: 16px;
    height: 16px;

    &::before,
    &::after {
      position: absolute;
      display: inline-block;
      content: '';
    }

    &::before {
      width: 18px;
      height: 18px;
      margin-right: 4px;
      border: 1px solid ${Colors.gray};
      border-radius: 3px;
    }

    &:checked::after {
      top: -2px;
      right: 0;
      bottom: 0;
      left: 5px;
      width: 7px;
      height: 12px;
      margin-top: auto;
      margin-bottom: auto;
      border-right: 3px solid ${Colors.primary};
      border-bottom: 3px solid ${Colors.primary};
      transform: rotate(40deg);
    }
  `,
  text: css`
    :not(:first-child) {
      margin-left: 6px;
    }
  `,
}
