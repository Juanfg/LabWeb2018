import { Request, Response, NextFunction } from 'express';
import { SepomexInstance } from './../models/sepomex';
import * as Sequelize from 'sequelize';
import Models from './../models';

class MunicipioCtrl {

    constructor() { }

    public getMunicipios(req: Request, res: Response, next: NextFunction) {
        Models.Sepomex
            .findAll({
                attributes: [Sequelize.literal('DISTINCT idmunicipio'), 'estado', 'idmunicipio', 'municipio'],
                order: ['idmunicipio']
            })
            .then((result: any) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({"message": `Error al tratar de acceder a los municipios ${err}`}));
    }

    public coloniasFromMunicipios(req: Request, res: Response, next: NextFunction) {
        Models.Sepomex
            .findAll({
                attributes: [Sequelize.literal('DISTINCT asentamiento'), 'asentamiento', 'cp', 'tipo', 'municipio'],
                order: ['asentamiento'],
                where: {
                    idestado: parseInt(req.params.idmunicipio)
                }
            })
            .then((result: any) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({"message": `Error al tratar de acceder a las colonias a traves de los municipios ${err}`}));
    }
}

export default new MunicipioCtrl();