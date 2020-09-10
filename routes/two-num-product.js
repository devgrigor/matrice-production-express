var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = req.body;

    res.send({
        result: data.num1 * data.num2
    });
});

/* GET users listing. */
router.post('/', function(req, res, next) {
    const data = req.body;

    if(data.mat1 === undefined || data.mat2 === undefined) {
        res.status(422).send({
            error: 'mat1 and mat2 are required'
        });

        return;
    }

    const mat1 = data.mat1;
    const mat2 = data.mat2;

    const mat1Len = mat1[0].length;
    for(let i = 1; i < mat1.length; i++) {
        if(mat1[i].length !== mat1Len) {
            res.status(422).send({
                error: 'mat1 is not a matrice'
            });

            return;
        }
    }

    const mat2Len = mat2[0].length;
    for(let i = 1; i < mat2.length; i++) {
        if(mat2[i].length !== mat2Len) {
            res.status(422).send({
                error: 'mat2 is not a matrice'
            });

            return;
        }
    }

    if(mat2.length !== mat1Len) {
        res.status(422).send({
            error: 'mat 1 can\'t be multiplied by mat 2'
        });

        return ;
    }

    const result = [];

    for( let j = 0; j < mat1.length; j++)  {
        for(let mat2J = 0; mat2J < mat2[0].length; mat2J++) {
        
            let sum = 0;

            for(let i = 0; i < mat1[j].length; i++) {
                sum += mat1[j][i] * mat2[i][mat2J];
            }
            
            if(!result[j]) {
                result[j] = [sum];
            } else {
                result[j].push(sum);
            }
        }        
    }
    
    // x*y and y*z
    // x + y * z * x = O(x*y*z)

    res.send({
        result: result
    })
});

module.exports = router;
