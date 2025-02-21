import React from 'react';
import axios from "axios";


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            error_code: null,
            error_msg: null
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/list').
        catch((error) => {
            this.setState({
                error_code: error.response?.status || "Ошибка",
                error_msg: error.message
                })
            }).
        then((response) => {
            const data = response.json();
            if (typeof data?.detail === 'undefined') {
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

    render() {
        const {data, error_code, error_msg} = this.state;


        if (!error_code || !error_msg) {
            return (
                <div id="list">
                    <div className="panel"></div>
                    <div className="dishes">
                        <div className="list_of_dishes">
                            <div className="dish">
                                <h2>Код ошибки {error_code}</h2>
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


        const dishes = document.createElement('div');
        dishes.setAttribute('className', 'dishes');

        for (let d of data) {
            dishes.innerHTML +=
                `<div className="list_of_dishes">
                   <div className="dish">
                        <h2>${d.name}</h2>
                        <img src=${d.preview} alt=${d.name} className="photo_of_dish_in_list" />
                   </div>
                </div>
                `
        }

        return (
            <div id="list">
                <div className="panel"></div>
                    {dishes}
                <div className="panel"></div>
            </div>
        )
    }
}

export default List;