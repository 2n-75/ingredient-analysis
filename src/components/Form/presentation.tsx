import { Colors } from '@/styles/colors'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { css, keyframes } from '@emotion/css'
import { FormValue } from '.'
import { Button } from '../Button'

export type Props = {
  onSubmit: SubmitHandler<FormValue>
  isSubmitting: boolean
}

const Presentation: FC<Props> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValue>({ mode: 'onChange' })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputContainer}>
          <label>ひとつめの商品</label>
          <input
            placeholder="https://www.cosme.com/products/detail.php?product_id=000000"
            {...register('url1', {
              required: true,
              pattern: /^https:\/\/www.cosme.com\/products\/detail.php\?product_id=[0-9]+$/i,
            })}
            className={styles.input}
          />
          {errors.url1 && <p className={styles.errorMessage}>URLの形式が＠cosmeshoppingと一致しません</p>}
        </div>

        <div className={styles.inputContainer}>
          <label>ふたつめの商品</label>
          <input
            placeholder="https://www.cosme.com/products/detail.php?product_id=000000"
            {...register('url2', {
              required: true,
              pattern: /^https:\/\/www.cosme.com\/products\/detail.php\?product_id=[0-9]+$/i,
            })}
            className={styles.input}
          />
          {errors.url2 && <p className={styles.errorMessage}>URLの形式が＠cosmeshoppingと一致しません</p>}
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <Button className={styles.submitButton} type="submit" disabled={isSubmitting || !isDirty || !isValid}>
              比較する
            </Button>

            {isSubmitting && (
              <>
                <div className={styles.loaderContainer}>
                  <div className={styles.loader}></div>
                </div>
                <p className={styles.loadingDescription}>商品情報を取得中です</p>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

const loadingAnimation = {
  alpha: keyframes`
    0% { opacity: 1; }
    33% {  opacity: 0.25; }
    66% { opacity: 0.25; }
    100% {  opacity: 1; }
  `,
  alphaBefore: keyframes`
    0% { opacity: 0.25; }
    33% { opacity: 1; }
    66% { opacity: 0.25; }
  
  `,
  alphaAfter: keyframes`
    33% { opacity: 0.25; }
    66% { opacity: 1; }
    100% { opacity: 0.25; }
  `,
}
const styles = {
  form: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  inputContainer: css`
    height: 100px;
  `,
  input: css`
    width: 100%;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid ${Colors.gray};
    &::placeholder {
      color: ${Colors.gray};
    }
    margin-top: 4px;
  `,
  buttonContainer: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  `,
  loadingDescription: css`
    margin-top: 10px;
    text-align: center;
  `,
  submitButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    width: 180px;
    height: 42px;
    background: ${Colors.primary};
    color: white;
    border-radius: 3px;
    transition: 0.4s;
    border: none;
    font-weight: 700;
    &:disabled {
      background: ${Colors.gray};
    }
  `,
  errorMessage: css`
    margin-top: 4px;
    font-size: 0.75em;
    color: ${Colors.highlight};
  `,
  checkbox: css`
    width: 20px;
    height: 20px;
    background: blue;
    &:checked {
      background: red;
    }
  `,
  loaderContainer: css`
    width: 100px;
    height: 30px;
    margin: 60px auto 0;
    position: relative;
  `,
  loader: css`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    background: ${Colors.primary};
    opacity: 1;
    position: relative;
    width: 12px;
    height: 12px;
    top: 15px;
    border-radius: 50%;
    opacity: 1;
    transform-origin: center center;
    display: inline-block;
    animation: ${loadingAnimation.alpha} 2.5s infinite linear;

    &:before,
    &:after {
      transform-origin: center center;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${Colors.primary};
      content: '';
      position: relative;
      opacity: 0.25;
    }
    &:before {
      left: 24px;
      top: 0px;
      animation: ${loadingAnimation.alphaBefore} 2.5s infinite linear;
    }

    &:after {
      left: -24px;
      top: -23px;
      animation: ${loadingAnimation.alphaAfter} 2.5s infinite linear;
    }
  `,
}

export default Presentation
