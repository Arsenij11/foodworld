import React from 'react';
import timer from './img/dish/3003125.png';
import like from './img/dish/images.png';
import dislike from './img/dish/dislike.png';

class Dish extends React.Component {
    render() {
        return (
            <div id="recept">
                <span className="panel"></span>
                <span className="receptinfo">
                    <span className="title">Паста карбонара «Pasta alla carbonara»</span>
                    <span className="preparetime">
                        <span className="time"> <img src={timer} /> 30 минут</span>
                        <span className="count_likes"><img src={like} /> 30</span>
                        <span className="count_dislikes"><img src={dislike} /> 30</span>
                    </span>
                    <span className="energy">
                        <h2>Энергетическая ценность на порцию</h2>
                        <span className="energy_info">
                            <span className="energy_cat"><b>Калорийность</b><p>825</p><p>Ккал</p></span>
                            <span className="energy_cat"><b>Белки</b><p>27</p><p>Грамм</p></span>
                            <span className="energy_cat"><b>Жиры</b><p>53</p><p>Грамм</p></span>
                            <span className="energy_cat"><b>Углеводы</b><p>60</p><p>Грамм</p></span>
                        </span>
                    </span>
                    <span className="ingridients">
                        <h2>Ингридиенты</h2>
                        <span className="ing"><p>Спагетти</p><p>80 г</p></span>
                        <span className="ing"><p>Спагетти</p><p>80 г</p></span>
                        <span className="ing"><p>Спагетти</p><p>80 г</p></span>
                        <span className="ing"><p>Спагетти</p><p>80 г</p></span>
                        <span className="ing"><p>Спагетти</p><p>80 г</p></span>
                        <span className="ing"><p>Спагетти</p><p>80 г</p></span>
                    </span>
                    <span className="instruction">
                        <h2>Инструкция приготовления</h2>
                        <ol className="alg">
                            <li>Спагетти варить 7-10 минут в кипящей подсоленной воде и откинуть на дуршлаг.</li>
                            <li>В сковороде разогрейте оливковое масло, положите чеснок и слегка подрумяньте.</li>
                        </ol>
                    </span>
                </span>
                <span className="panel"></span>
            </div>
        )
    }
}

export default Dish;