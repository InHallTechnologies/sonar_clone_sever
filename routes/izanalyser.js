const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/get-projects', async (req, res) => {
    const response = await axios.get('https://diageo-analyzer.integralzone.com/api/projects/search', {
        params: {
            'organization': 'diageoglobalcms',
            "ps": 5
        },
        auth: {
            username: 'b0254068a01a43123ab075d380332164348d4231'
        }
    });
    res.send(response.data)
   
})

router.get('/get-single-project-detail', async (req, res) => {
    const { projectKey } = req.query;
    const response = await axios.get('https://diageo-analyzer.integralzone.com/api/projects/search', {
        params: {
            'organization': 'diageoglobalcms',
            "projects": projectKey
        },
        auth: {
            username: 'b0254068a01a43123ab075d380332164348d4231'
        }
    });
    res.send(response.data)
})

router.get('/measures', async (req, res) => {
    const { projectKey } = req.query;
    try {

        const response = await axios.get('https://diageo-analyzer.integralzone.com/api/measures/component', {
            auth: {
                username: 'b0254068a01a43123ab075d380332164348d4231'
            },
            params: {
                'metricKeys': 'ncloc,complexity,violations',
                'component': projectKey,
                'additionalFields': 'periods,metrics',
            },
        });
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
})

router.get('/project-meta-data', async (req, res) => {
    const { projectKey, type } = req.query;
    try {
        const response = await axios.get('https://diageo-analyzer.integralzone.com/api/issues/search', {
            auth: {
                username: 'b0254068a01a43123ab075d380332164348d4231'
            },
            params: {
                'componentKeys': projectKey,
                'types': type,
            },
        });
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
})

router.get("/quality-gate", async (req, res) => {
    const { projectKey } = req.query;
    try {
        console.log(projectKey);

        const response = await axios.get('https://diageo-analyzer.integralzone.com/api/project_branches/list', {
            params: {
                'organization': 'diageoglobalcms',
                "project": projectKey
            },
            auth: {
                username: 'b0254068a01a43123ab075d380332164348d4231'
            }
        });
        res.send(response.data)
    }catch(err) {
        res.send(err);
    }
   
})

// https://dev.azure.com/GlobalInsight/Consolidated%2520Dashboard
// sougata.choudhury@diageo.com

module.exports = router

// RK
// https://github.com/InHallTechnologies/consolidated-dashboard-sougata.git
// https://github.com/InHallTechnologies/sonar_clone_sever.git