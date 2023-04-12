import React from "react"
import styles from "./Home.module.scss"
// import ProblemImageOne from "assets/images/home/problem/problem1.png"
// import ProblemImageTwo from "assets/images/home/problem/problem2.png"
// import ProblemImageThree from "assets/images/home/problem/problem3.png"

import ProblemsImage from "assets/images/home/problem/problems.png"


export const Problem = () => {
    return (
        <section className={styles.problem}>
            <div className={styles.imageWrapper}>
                <img className={styles.imageProblems} src={ProblemsImage} alt="Problems" />
            </div>  
            {/* <div className={styles.images}>
                <div className={styles.imagesOneThree}>
                    <img src={ProblemImageOne} alt="Show problem" />
                    <img src={ProblemImageThree} alt="Discuss problem" />
                </div>
                <div className={styles.imageTwo}>
                    <img src={ProblemImageTwo} alt="Read problem" />
                </div>         
            </div> */}
            <div className={styles.text}>
                <p className={styles.textParagraphOne}>
                    Во время интервью или публичного 
                    выступления не знаешь что сказать, 
                    не можешь подобрать нужное слово 
                    или вообще впадаешь в ступор.
                </p>
                <p className={styles.textParagraph}>
                    Запись собственной речи 
                    и&nbsp;тренировочные диалоги 
                    с&nbsp;родными или друзьями давно 
                    и&nbsp;успешно используют, чтобы снизить 
                    уровень стресса перед важным 
                    выступлением и&nbsp;повысить 
                    уверенность в себе.
                </p>
            </div>
        </section>
    )
}