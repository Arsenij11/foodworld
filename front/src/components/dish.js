import React from 'react';
import timer from './img/dish/3003125.png';
import axios from "axios";
import like_img from './img/dish/images.png';
import dislike_img from './img/dish/dislike.png';
import left from './img/Иконка_стрелки_влево_(ei).svg.png'
import right from './img/Иконка_стрелки_вправо_(ei).svg.png'
import default_img from './img/img.png'

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
    getIdFromUrl() {
        const parts = window.location.pathname.split("/");
        return parts[parts.length - 1]; // предполагаем, что ID — последний сегмент URL
    }
    componentDidMount() {
        const id = this.getIdFromUrl();
        axios.get(`http://127.0.0.1:8000/dish/${id}`).
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
    // change_photo(event) {
    //     if (event.target.getAttribute('className') === 'move') {
    //         if (event.target.getAttribute('alt') === 'стрелка влево') {
    //             let photos = this.state.photo;
    //             photos.map((value, index) => {
    //                 if (index === 0) {
    //                     photos.push(value);
    //                 }
    //                 else {
    //                     index--;
    //                 }
    //             })
    //             console.log(photos);
    //         }
    //         // else {
    //         //
    //         // }
    //     }
    // }
    render() {
        const { id,
                name,
                add_date,
                prepare_time,
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

        let catrus;
        if (category) {
            switch (category) {
                case 'Desert':
                    catrus = 'Десерты';
                    break;
                case 'Meat_dish':
                    catrus = 'Мясные блюда';
                    break;
                case 'Snacks':
                    catrus = 'Закуски';
                    break;
                case 'Soups':
                    catrus = 'Супы';
                    break;
                case 'Salads':
                    catrus = 'Салаты';
                    break;
            }
        }

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
            like === null ||
            dislike === null ||
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
                <span className="ing" key={i.id}><p>{i.name}</p><p>{i.count}</p></span>
            )
        }

        const alg = [];

        for (let i of instruction) {
            alg.push(<li key={i.id}>{i.text}</li>)
        }

        const photos = [];

        for (let p of photo) {
            if (photo.indexOf(p) >= 4) {
                photos.push(<img key={p.id} src={p.url} className="photo_none" />);
                continue;
            }
            photos.push(<img key={p.id} src={p.url} className="photo" />);
        }


        return (
            <div id="recept">
                <span className="panel"></span>
                <span className="receptinfo">
                    <span className="title">{name}</span>
                    <span className="preparetime">
                        <span className="time"> <img src={timer} /> {prepare_time} минут</span>
                        <span className="count_likes"><img src={like_img} alt="like" onClick={event =>
                        {
                            axios.patch(`http://127.0.0.1:8000/rating/like/${id}`);
                            const like = this.state.like;
                            this.setState({like : like + 1})
                        }
                        }
                                                           className="todislike"
                        /> {like}</span>
                        <span className="count_dislikes"><img src={dislike_img} alt="dislike" onClick={event =>
                        {
                            axios.patch(`http://127.0.0.1:8000/rating/dislike/${id}`);
                            const dislike = this.state.dislike;
                            this.setState({dislike : dislike + 1})
                        }
                        }
                        className="tolike"
                        /> {dislike}</span>
                    </span>
                    <span className="change_photo">
                        <span className="strelka">
                            <img
                                src={left} alt="стрелка влево" className={photos.length < 2 ? "ban" : "move"}
                                 onClick={(event) => {
                                     if (event.target.className === 'move') {
                                             let photos = this.state.photo;
                                             photos.unshift(photos[photos.length - 1]);
                                             photos.pop();
                                             this.setState({ photo: photos });
                                     }
                                 }
                            }
                            />
                        </span>
                        <span className="photos">
                            {photos.length === 0 ? <img src={default_img} className="photo" /> : photos}
                        </span>
                        <span className="strelka">
                            <img
                                src={right} alt="стрелка вправо" className={photos.length < 2 ? "ban" : "move"}
                                onClick={(event) => {
                                    if (event.target.className === 'move') {
                                            let photos = this.state.photo;
                                            photos.push(photos[0]);
                                            photos.shift();
                                            this.setState({ photo: photos });
                                    }
                                }
                                }
                            />
                        </span>
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
                        <a href={`http://localhost:5000/dishbycat/${category}`}>Посмотреть другие блюда в категории: {catrus}</a>
                    </span>
                </span>
                <span className="panel"></span>
            </div>
        )
    }
}

export default Dish;