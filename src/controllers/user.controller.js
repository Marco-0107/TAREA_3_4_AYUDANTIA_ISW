import { UserSchema } from "../entity/user.entity.js";
import { appDataSource } from "../config/configDB.js";

export async function createUser(req, res) {
    try {
        const userRepository = appDataSource.getRepository(UserSchema);
        const user = req.body;
        if (!user) {
            return res.status(400).json({
                message: "deben enviarse datos",
                data: null
            });
        }
        const newUser = userRepository.create({
            nombreCompleto: user.nombreCompleto,
            correo: user.correo,
            rut: user.rut
        })

        const userSaved = await userRepository.save(newUser);
        return res.status(201).json({
            message: "Usuario creado",
            data: userSaved
        })
    } catch (error) {
        console.error("error al crear el usuario :", error);
    }
}

export async function getUser(req, res) {
    try {
        const userRepository = appDataSource.getRepository(UserSchema);
        const id = req.params.id;
        const userFound = await userRepository.findOne({ where: [{ id: id }] });
        if (!userFound) {
            return res.status(404).json({ message: "usuario no encontrado", data: null });
        }

        return res.status(302).json({ message: "usuario encontrado", data: userFound });

    } catch (error) {
        console.error(error);
    }
}


export async function getUsers(req, res) {
    const userRepository = appDataSource.getRepository(UserSchema);
    const users = await userRepository.find();
    if (!users) {
        return res.status(404).json({
            message: "No se encontraron usuarios ",
            data: null
        });
    }
    return res.status(302).json({
        message: "Se encontraron usuarios ",
        data: users
    })
}

export async function deleteUser(req,res) {
    try {
        const userRepository = appDataSource.getRepository(UserSchema);
        const id = req.params.id;
        const userFound = await userRepository.findOne({ where: [{ id: id }] });
        if (!userFound) {
            return res.status(404).json({ message: "usuario no encontrado", data: null });
        }
        await userRepository.delete(userFound);
        return res.status(200).json({ message: "usuario eliminado", data: null });
    } catch (error) {
        console.error(error);
    }
    
}

export async function updateUser(req, res) {
    try {
        const userRepository = appDataSource.getRepository(UserSchema);
        const id = req.params.id;
        const userFound = await userRepository.findOne({ where: [{ id: id }] });
        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado", data: null });
        }
        const updatedUser = await userRepository.update(id, req.body);
        if (updatedUser.affected === 0) {
            return res.status(400).json({ message: "No se pudo actualizar el usuario", data: null });
        }
        return res.status(200).json({ message: "Usuario actualizado exitosamente", data: updatedUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor", data: null });
    }
}

