import React from 'react';
import axios from "axios";


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            error_code: null,
            error_msg: null,
            category: false
        }
    }
    getIdFromUrl() {
        const parts = window.location.pathname.split("/");
        return parts[parts.length - 1];
    }
    componentDidMount() {
        const path = this.getIdFromUrl();
        if (path === 'list') {
            axios.get('http://127.0.0.1:8000/list')
                .catch((error) => {
                    this.setState({
                        error_code: error.response?.status || "Ошибка",
                        error_msg: error.message
                    })
                })
                .then((response) => {
                    const data = response.data;
                    if (typeof data?.detail === 'undefined'){
                        this.setState({
                            data: data
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
        else {
            axios.get(`http://127.0.0.1:8000/list/category/${path}`)
                .catch((error) => {
                    this.setState({
                        error_code: error.response?.status || "Ошибка",
                        error_msg: error.message
                    })
                })
                .then((response) => {
                    const data = response.data;
                    if (data === 'No objects') {
                        this.setState({
                            error_code: 'Здесь ничего нет',
                            error_msg: 'Попробуйте выбрать другую категорию'
                        })
                    }
                    else if (typeof data?.detail === 'undefined') {
                        this.setState({
                            data: data,
                            category: path,
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
    }


    render() {
        let {data, error_code, error_msg, category} = this.state;

        const path = this.getIdFromUrl();
        if (path !== 'list') {
            category = path;
        }


        if (category) {
            switch (category) {
                case 'Desert':
                    category = 'Десерты';
                    break;
                case 'Meat_dish':
                    category = 'Мясные блюда';
                    break;
                case 'Snacks':
                    category = 'Закуски';
                    break;
                case 'Soups':
                    category = 'Супы';
                    break;
                case 'Salads':
                    category = 'Салаты';
                    break;
            }
        }

        if (error_code || error_msg) {
            return (
                <div id="list">
                    <div id="header">{category ? 'Категория ' + category : 'Все блюда'}</div>
                    <div className="panel"></div>
                    <div className="dishes">
                        <div className="list_of_dishes" onClick={(event) => window.location.href = 'http://localhost:5000'}>
                            <div className="dish">
                                <h2>{error_code}</h2>
                                <p>{error_msg}</p>
                            </div>
                        </div>
                    </div>
                    <div className="panel"></div>
                </div>
            )
        }

        if (!data) {
            return (
                <div id="list">
                    <div id="header">{category ? 'Категория ' + category : 'Все блюда'}</div>
                    <div className="panel"></div>
                    <div className="dishes">
                        <div className="list_of_dishes">
                            <div className="dish">
                                <h2>Загружается</h2>
                                <p>Ожидайте...</p>
                            </div>
                        </div>
                    </div>
                    <div className="panel"></div>
                </div>
            )
        }



        const dishes = [];

        for (let d of data) {
            dishes.push(<div className="list_of_dishes" key={d.id} onClick={event => window.location.href = `http://localhost:5000/dish/${d.id}`} >
                   <div className="dish">
                        <h2>{d.name}</h2>
                        <img src={d.preview} alt={d.name} className="photo_of_dish_in_list"  />
                   </div>
                </div>
            )
        }

        return (
            <div id="list">
                <div id="header">{category ? 'Категория ' + category : 'Все блюда'}</div>
                <div className="panel"></div>
                    <div className="dishes">
                        {dishes}
                    </div>
                <div className="panel"></div>
            </div>
        )
    }
}

export default List;