import React from 'react'

const Footer = () => {
    return (
        <div className="container-fluid mt-5">
            <div className="row shadow-lg">
                <div className="col-1"></div>
                <div className="col-md- col-lg-2 order-1 order-lg-2 text-center text-lg-start">
                    <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                        <div className="d-flex align-items-center justify-content-center bg-light rounded mt-5" style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-twitter text-black"></i>
                        </div>
                        <div className="d-flex align-items-center justify-content-center bg-light rounded mt-5" style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-facebook text-black"></i>
                        </div>
                        <div className="d-flex align-items-center justify-content-center bg-light rounded mt-5" style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-instagram text-black"></i>
                        </div>
                        <div className="d-flex align-items-center justify-content-center bg-light rounded mt-5" style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-skype text-black"></i>
                        </div>
                        <div className="d-flex align-items-center justify-content-center bg-light rounded mt-5" style={{ width: '40px', height: '40px' }}>
                            <i className="bi bi-linkedin text-black"></i>
                        </div>
                    </div>
                </div>


                <div className="col-md-12 col-lg-6 order-2 order-lg-1 p-4 text-center text-lg-start">
                    <p className="text-black">&copy;Copyright <span className="fw-bold">Centauro.</span> Todos los derechos reservados</p>
                    <p className="text-black">Designed by <span style={{ color: '#db905b' }} >Débora Nobs</span></p>
                </div>

            </div>
        </div>
    )
}

export default Footer



{
    /*
    <div className="container-fluid mt-5">
    <div className="row mt-5">

        <div className="col-4 mt-5">
            <div className="row">
                <div className="col-3 ms-3">
                    <p className="text-black mb-5">contact us</p>
                </div>
                <div className="col">
                    <p className="text-black subrayado-blanco">centauro.net</p>
                </div>
            </div>
        
            <div className="row">
                <p className="text-black letras">The next and graphic content of the website belongs to centauro and <br />
                                                cannot be used by other resources without our permission and <br />
                                                without the link to the source</p>
            </div>
            <div className="row">
                <p className="text-black letras">&copy;centauro 2025</p>
            </div>
        </div>

        <div className="col-1"> </div>

        <div className="col-1 mt-5 d-block d-sm-none">
            <div className="row">
                <p className="text-black">follow us</p>
            </div>

            <div className="d-block d-sm-none d-flex gap-3 mt-3">
                <p className="text-black"><i className="bi bi-instagram"></i></p>
                <p className="text-black"><i className="bi bi-facebook"></i></p>
                <p className="text-black"><i className="bi bi-twitter-x"></i></p>
                <p className="text-black"><i className="bi bi-vimeo"></i></p>      
                <p className="text-black"><i className="bi bi-youtube"></i></p>
            </div>
        </div>

        <div className="col-2"> </div>

        <div className="col-1 mt-3 d-none d-sm-block">
            <div className="row mt-5 ">
                <p className="text-black subrayado-blanco menor-espaciado">dribble</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">savee</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">behance</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">medium</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">awwwards</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">linkedin</p>
                <hr />
            </div>
        </div>

        <div className="col-2"> </div>


        <div className="col-1 mt-5 d-none d-sm-block">
            <div className="row mt-3">
                <p className="text-black subrayado-blanco menor-espaciado">instagram</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">facebook</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">twitter</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">vimeo</p>
                <hr />
            </div>
            <div className="row">
                <p className="text-black subrayado-blanco menor-espaciado">youtube</p>
                <hr />
            </div>
        </div>

    </div>
</div>

    */
}