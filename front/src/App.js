import React from "react";
import Header from "./components/header";
import List from "./components/list";
import Categories from "./components/categories";
import {Route, Routes} from "react-router-dom";
import Dish from "./components/dish";

class App extends React.Component {
    render() {
        return (
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <main>
                                <Categories />
                            </main>
                        </>
                    } />
                    <Route path="/list" element={
                        <>
                            <Header />
                            <main>
                                <List />
                            </main>
                        </>
                    } />
                    <Route path="/dish/:id" element={
                        <>
                            <Header />
                            <main>
                                <Dish />
                            </main>
                        </>
                    } />
                    <Route path="/dishbycat/:cat" element={
                        <>
                            <Header />
                            <main>
                                <List />
                            </main>
                        </>
                    }/>
                </Routes>
        )
    }
}

export default App;