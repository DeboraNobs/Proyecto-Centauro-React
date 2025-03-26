const CarDetails = ({ coche }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
                <hr />
                <p className="card-text"><strong>Descripción:</strong> {coche.descripcion}</p>
                <p className="card-text"><strong>Matrícula:</strong> {coche.patente}</p>
                <p className="card-text"><strong>Tipo:</strong> {coche.tipo_coche}</p>
                <p className="card-text"><strong>Tipo cambio:</strong> {coche.tipo_cambio}</p>
                <p className="card-text"><strong>Puertas:</strong> {coche.num_puertas}</p>
                <p className="card-text"><strong>Plazas:</strong> {coche.num_plazas}</p>
                <p className="card-text"><strong>Aire acondicionado:</strong> {coche.posee_aire_acondicionado ? 'Sí' : 'No'}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary">Reservar</button>
            </div>
        </div>
    );
}

export default CarDetails;


