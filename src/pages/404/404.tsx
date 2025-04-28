import style from './404.module.css';
import { useEffect, useRef } from 'react';

const Page404 = (): React.JSX.Element => {
	const boxGhostEyes = useRef<HTMLDivElement>(null);
	useEffect(() => {
		document.addEventListener('mousemove', mouseMove);
		return () => {
			document.removeEventListener('mousemove', mouseMove);
		};
	}, []);
	const mouseMove = (e: MouseEvent): void => {
		const pageX: number = document.body.offsetWidth;
		const pageY: number = window.innerHeight;
		//verticalAxis
		const mouseY: number = e.clientY;
		const yAxis: number = ((pageY - mouseY + 100) / pageY) * 300;
		//horizontalAxis
		const mouseX: number = e.clientX / -pageX;
		const xAxis: number = -mouseX * 100 - 100;

		if (boxGhostEyes.current) {
			boxGhostEyes.current.style.transform =
				'translate(' + xAxis + '%,-' + yAxis + '%)';
		}
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
