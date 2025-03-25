import React from "react";
import soup from './img/categories/chechevichnii_sup_v_hlebe-124079.jpg'
import salad from './img/categories/5a71adf5-3716-49f3-843e-001880cb3a49.png'
import grenky from './img/categories/u6009-8370488359932aea417140713ee674aa.jpg'
import dolma from './img/categories/meat-dolma-2.jpg'
import shtrudel from './img/categories/u-4010a877484dcc292c375a6275def7b0.jpg'



class Categories extends React.Component {

    render() {
        return (
                <div id="categories">
                    <span className="cat13">
                        <span className="cat" id="Soups" onClick={event => window.location.href = `http://localhost:9000/dishbycat/${event.target.id}`}>
                            <img src={soup} alt="суп" className='img_in_cat' />
                            <span>Супы</span>
                        </span>
                        <span className="cat" id="Salads" onClick={event => window.location.href = `http://localhost:9000/dishbycat/${event.target.id}`}>
                            <img src={salad} alt="салат" className='img_in_cat' />
                            <span>Салаты</span>
                        </span>
                        <span className="cat" id="Snacks" onClick={event => window.location.href = `http://localhost:9000/dishbycat/${event.target.id}`}>
                            <img src={grenky} alt="закуски" className='img_in_cat' />
                            <span>Закуски</span>
                        </span>
                    </span>
                    <span className="cat45">
                        <span className="cat" id="Meat_dish" onClick={event => window.location.href = `http://localhost:9000/dishbycat/${event.target.id}`}>
                            <img src={dolma} alt="мясные блюда" className='img_in_cat' />
                            <span>Мясные блюда</span>
                        </span>
                        <span className="cat" id="Desert" onClick={event => window.location.href = `http://localhost:9000/dishbycat/${event.target.id}`}>
                            <img src={shtrudel} alt="десерты" className='img_in_cat' />
                            <span>Десерты</span>
                        </span>
                    </span>
                </div>
        )
    }
}

export default Categories;