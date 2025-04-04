import { Request, Response, Router } from 'express';

const router = Router();

const users = [
    { id: 1, name: 'Alexa De Luna', email: 'alexa@deluna.com' },
    { id: 2, name: 'Iyan Calderon', email: 'iyan@calderon.com' },
    { id: 3, name: 'Larie Rubi', email: 'larie@rubi.com' },
    { id: 4, name: 'Cedric Cornelio', email: 'cedric@cornelio.com' }
];

// GET USERS
router.get('/', async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users: users
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
});

// GET USER BY ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id); // Ensuring the ID is a number
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            user: user
        });
    } catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: error.message
        });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {           
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const newUser = {
            id: users.length + 1,
            name,
            email
        };
        users.push(newUser);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
});


export default router;
