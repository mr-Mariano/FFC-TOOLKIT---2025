import React from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';


const Index = () => {
    return (
        <>
        <NavBar />
        <div className="main-container">
            {/* HEADER */}
            <div className='container'>
                <Header />
            </div>
            {/* CARDS CONTAINERS */}
            <div className='container'>
                <div className='cards-container'>
                    <Card link="logic" tema='Tablas de verdad' descripcion='Lorem ipsum dolor sit amet.' />
                    <Card link="page2" tema='Tema 2' descripcion='Lorem ipsum dolor sit amet.' />
                    <Card link="page3" tema='Tema 3' descripcion='Lorem ipsum dolor sit amet.' />
                    <Card link="page4" tema='Tema 4' descripcion='Lorem ipsum dolor sit amet.' />
                    <Card link="page5" tema='Tema 5' descripcion='Lorem ipsum dolor sit amet.' />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Index;