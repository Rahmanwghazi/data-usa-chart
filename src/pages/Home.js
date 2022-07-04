import Charts from '../components/charts/Charts';
import styles from './style.module.css';

export default function Home() {
    return (
        <div className={styles.root}>
            <h2>Population of the United States</h2>
            <Charts />
        </div>
    );
}