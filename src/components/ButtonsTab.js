import styles from './ButtonsTab.module.css'

const ButtonsTab = ( {children} ) => {
    return (
        <div className = {styles['buttons-tab']}>
            { children }
        </div>
    )
}

export default ButtonsTab