import styles from './styles.module.css'

export function OpenRange(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props
  
  return <span className={`${className ? className + ' ' : ''}${styles.openRange}`} {...restProps} />
}
