import React from 'react';
import { useSelector } from '../../app/hooks';
import style from './feed.module.css';

import ModalPopup from '../../components/modal/modal-popup';
import CommonOrderFeed from '../../components/common-order-feed/common-order-feed';
import Statistics from '../../components/common-order-feed/statistics';

const Feed = (): React.JSX.Element => {
	//Modal logic
	//flag on modal is visible or removed from DOM
	const modalIsVisible = useSelector((state) => {
		return state.modal.modalIsVisible;
	});

	return (
		<>
			<section className={style.content}>
				<div className={style.leftBox}>
					<CommonOrderFeed />
				</div>
				<div className={style.rightBox}>
					<Statistics />
				</div>
			</section>
			{modalIsVisible && <ModalPopup />}
		</>
	);
};

export default Feed;
