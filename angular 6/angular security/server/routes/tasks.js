const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    dataFile = '/data/tasks.json',
    router = express.Router();

const getNextAvailableId = (collection) => {
    const collectionIds = collection.map((c) => c.id);
    let maxId = Math.max(...collectionIds);
    return ++maxId;
}

const getTaskData = () => (
    JSON.parse(
        fs.readFileSync(
           path.join(__dirname + dataFile) , 'utf8'
        )
    )
);

const saveTaskData = (data) => (
    fs.writeFile(
        path.join(__dirname + dataFile), 
        JSON.stringify(data, null, 4),
        (err) => {
            if (err) {
                console.log(err);
            }
        })
);

router.route('/')
    .get((_, res) => {
        const data = getTaskData();
        res.send(data);
    })
    .post((req, res) => {
        const data = getTaskData();
        const nextId = getNextAvailableId(data);
        const newTask = {
            id: nextId,
            name: req.body.name,
            milestones: [],
            userPermissions: [],
        };
        data.push(newTask);
        saveTaskData(data);

        res.status(201).send(newTask);
    });

/* GET, PUT and DELETE individual tasks */
router.route('/:id')
    .get((req, res) => {
        var data = getTaskData();
        var matchingTask = data.find(
            (item) => item.taskId === +req.params.id
        );

        if(!matchingTask) {
            res.sendStatus(404);
        } else {
            res.send(matchingTask);
        }
    })
//     .delete((req, res) => {
//         var data = getCarData();
//         var pos = data
//             .map((e) => e.car_id)
//             .indexOf(parseInt(req.params.id, 10));

//         if (pos > -1) {
//             data.splice(pos, 1);
//         } else {
//             res.sendStatus(404);
//         }

//         saveCarData(data);
//         res.sendStatus(204);
//     })
//     .put((req, res) => {
//         var data = getCarData();
//         var matchingCar = data.find(
//             (item) => item.car_id === req.params.id
//         );

//         if(!matchingCar) {
//             res.sendStatus(404);
//         } else {
//             matchingCar.name = req.body.name;
//             matchingCar.brand = req.body.brand;
//             matchingCar.year_release = req.body.year_release;

//             saveCarData(data);
//             res.sendStatus(204);
//             res.send(matchingCar);
//         }
//     });

module.exports = router;