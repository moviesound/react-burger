import style from './404.module.css';
import { useEffect, useRef } from 'react';

const Page404 = () => {
	const boxGhostEyes = useRef(null);
	useEffect(() => {
		document.addEventListener('mousemove', mouseMove);
		return () => {
			document.removeEventListener('mousemove', mouseMove);
		};
	}, []);
	const mouseMove = (e) => {
		let pageX = document.body.offsetWidth;
		let pageY = window.innerHeight ;
		//verticalAxis
		let mouseY = e.clientY;
		let yAxis = ((pageY - mouseY + 100) / pageY) * 300;
		//horizontalAxis
		let mouseX = e.clientX / -pageX;
		let xAxis = -mouseX * 100 - 100;

		boxGhostEyes.current.style.transform = 'translate(' + xAxis + '%,-' + yAxis + '%)';
	};
	return (
		<div className={style.box}>
			<div className={style.boxGhost}>
				<div className={style.symbol}></div>
				<div className={style.symbol}></div>
				<div className={style.symbol}></div>
				<div className={style.symbol}></div>
				<div className={style.symbol}></div>
				<div className={style.symbol}></div>
				<div className={style.boxGhostContainer}>
					<div ref={boxGhostEyes} className={style.boxGhostEyes}>
						<div className={style.boxEyeLeft}></div>
						<div className={style.boxEyeRight}></div>
					</div>
					<div className={style.boxGhostBottom}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div className={style.boxGhostShadow}></div>
			</div>
			<div className={style.boxDescription}>
				<div className={style.boxDescriptionContainer}>
					<div className={style.boxDescriptionTitle}>404</div>
					<div className={style.boxDescriptionText}>
						Ой! Кажется, этой страницы не существует
					</div>
				</div>
			</div>
		</div>
	);
};
export default Page404;
