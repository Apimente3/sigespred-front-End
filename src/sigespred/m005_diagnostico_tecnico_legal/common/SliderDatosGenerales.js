import React from 'react';




const SliderDatosGenerales = () => { 

   
    return (
        <>


      
            <div id="myCarousel" className="carousel slide"
                  data-ride="carousel">

            <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0"
                    className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>

            </ol>


            <div className="carousel-inner">
                <div className="item active">
                    <img src="http://localhost:7000/files/1574945538-drones-dji%20(1).jpg" alt="Los Angeles"
                         style={{height:'350px',width: '100%'}}/>
                </div>

                <div className="item">
                    <img src="http://200.121.128.47/cchanel/PD04.JPG" alt="Chicago"
                         style={{height:'350px',width: '100%'}}/>
                </div>


            </div>


            <a className="left carousel-control" href="#myCarousel"
               data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Anterior</span>
            </a>
            <a className="right carousel-control" href="#myCarousel"
               data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Siguiente</span>
            </a>
        </div>
            
        </>
    );
};

export default SliderDatosGenerales;