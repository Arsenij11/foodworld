import React from 'react';
import timer from './img/dish/3003125.png';
import axios from "axios";
import {useParams} from "react-router-dom";
import like_img from './img/dish/images.png';
import dislike_img from './img/dish/dislike.png';

class Dish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : null,
            name : null,
            add_date : null,
            prepare_time : null,
            like : null,
            dislike : null,
            calorijnost : null,
            belki : null,
            zhiry : null,
            uglevody : null,
            preview : null,
            category : null,
            ingredients : null,
            photo : null,
            instruction : null,
            error_code: null,
            error_msg: null
        }
    }

    componentDidMount() {
        const params = useParams();
        axios.get(`http://127.0.0.1:8000/dish/${params.dish_id}`).
        catch((error) => {
            this.setState({
                error_code: error.response?.status || "Ошибка",
                error_msg: error.message
            })
        }).
        then((response) => {
            const data = response.data;
            if (typeof data?.detail === 'undefined') {
                this.setState({
                    id : data.id,
                    name : data.name,
                    add_date : data.add_date,
                    prepare_time : data.prepare_time,
                    like : data.like,
                    dislike : data.dislike,
                    calorijnost : data.calorijnost,
                    belki : data.belki,
                    zhiry : data.zhiry,
                    uglevody : data.uglevody,
                    preview : data.preview,
                    category : data.category,
                    ingredients : data.ingredients,
                    photo : data.photo,
                    instruction : data.instruction,
                    error_code: null,
                    error_msg: null
                })
            }
            else {
                this.setState({
                    error_code: 'Ошибка',
                    error_msg: data.detail
                })
            }
        })
    }

    render() {
        const { id,
                name,
                add_date,
                like,
                dislike,
                calorijnost,
                belki,
                zhiry,
                uglevody,
                preview,
                category,
                ingredients,
                photo,
                instruction,
                error_code,
                error_msg
            } = this.state;


        if (error_code || error_msg) {
            return (
                <div id="recept">
                    <span className="receptinfo">
                        <span className="title">Ошибка {error_code}</span>
                        <h2>{error_msg}</h2>
                    </span>
                    <span className="panel"></span>
                </div>
            )
        }
        if (!id ||
            !name ||
            !add_date ||
            !like ||
            !dislike ||
            !calorijnost ||
            !belki ||
            !zhiry ||
            !uglevody ||
            !preview ||
            !category ||
            !ingredients ||
            !photo ||
            !instruction)
        {
           return (<div id="recept">
                    <span className="receptinfo">
                        <span className="title">Загружается...</span>
                        <h2>Ожидайте...</h2>
                    </span>
                <span className="panel"></span>
            </div>)
        }


        const ings = [];

        for (let i of ingredients) {
            ings.push(
                <span className="ing" key={i.id}><p>i.name</p><p>i.count</p></span>
            )
        }

        const alg = [];

        for (let i of instruction) {
            alg.push(<li key={i.id}>{i.number}. {i.text}</li>)
        }

        return (
            <div id="recept">
                <span className="panel"></span>
                <span className="receptinfo">
                    <span className="title">{name}</span>
                    <span className="preparetime">
                        <span className="time"> <img src={timer} /> {}</span>
                        <span className="count_likes"><img src={like_img} /> 30</span>
                        <span className="count_dislikes"><img src={dislike_img} /> 30</span>
                    </span>
                    <span className="energy">
                        <h2>Энергетическая ценность на порцию</h2>
                        <span className="energy_info">
                            <span className="energy_cat"><b>Калорийность</b><p>{calorijnost}</p><p>Ккал</p></span>
                            <span className="energy_cat"><b>Белки</b><p>{belki}</p><p>Грамм</p></span>
                            <span className="energy_cat"><b>Жиры</b><p>{zhiry}</p><p>Грамм</p></span>
                            <span className="energy_cat"><b>Углеводы</b><p>{uglevody}</p><p>Грамм</p></span>
                        </span>
                    </span>
                    <span className="ingridients">
                        <h2>Ингридиенты</h2>
                        {ings}
                    </span>
                    <span className="instruction">
                        <h2>Инструкция приготовления</h2>
                        <ol className="alg">
                            {alg}
                        </ol>
                    </span>
                </span>
                <span className="panel"></span>
            </div>
        )
    }
}

export default Dish;