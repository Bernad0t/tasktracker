import css from './css.module.scss';
import { IPanelTools } from '../../types';
import MainTools from '../GroupPanel/MainTool';

export default function MainPanelTools({ buttons }: { buttons: IPanelTools[] }) {
    return (
        <div className={css.panel}>
            <div style={{ width: '100%', flex: '1' }}>
                <MainTools buttons={buttons} />
            </div>
        </div>
    );
}
