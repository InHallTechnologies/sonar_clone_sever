const {
    default: axios
} = require('axios');
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors');

app.use(cors());

app.get('/get-list', async (req, res) => {
    const response = await axios.get('https://sonarcloud.io/api/projects/search', {
        params: {
            'organization': 'diageoglobalcms',
            "ps": 5
        },
        auth: {
            username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
        }
    });
    res.send(response.data)
})

app.get('/measures', async (req, res) => {
    const { projectKey } = req.query;
    try {

        const response = await axios.get('https://sonarcloud.io/api/measures/component', {
            auth: {
                username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
            },
            params: {
                'metricKeys': 'ncloc,complexity,violations,reliability',
                'component': projectKey,
                'additionalFields': 'periods,metrics'
            },
        });
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
})

app.get('/project-meta-data', async (req, res) => {
    const { projectKey } = req.query;

    try {

        const response = await axios.get('https://sonarcloud.io/api/project_branches/list', {
            auth: {
                username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
            },
            params: {
                'metricKeys': 'ncloc,complexity,violations,reliability',
                'project': projectKey,
                'additionalFields': 'periods,metrics'
            },
        });
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
})


app.get('/duplications', async (req, res) => {
    try {

        const response = await axios.get('https://sonarcloud.io/api/project_badges/measure', {
            auth: {
                username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
            },
            params: {
                'metricKeys': 'ncloc,complexity,violations,reliability',
                'project':'InHallTechnologies_estimation-tool-server',
                'metric': 'sqale_rating',
                'additionalFields': 'periods,metrics'
            },
        });
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
})

app.get('/hotspots', async (req, res) => {
    try {

        const response = await axios.get('https://sonarqube.com/api/hotspots/search', {
            auth: {
                username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
            },
            params: {
                componentKeys: 'InHallTechnologies_estimation-tool-server',
                types:"SECURITY_HOTSPOT"
            },
        });
        res.send(response.data)
    } catch (err) {
        res.send(err)
    }
})


// IZ Analyser Routes
app.get('/izanalyser/get-projects', async (req, res) => {
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

app.get('/izanalyser/measures', async (req, res) => {
    const { projectKey } = req.query;
    console.log(projectKey)
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


app.get('/izanalyser/project-meta-data', async (req, res) => {
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


app.listen(PORT, () => {
    console.log(`Server is running at url: http://localhost:${PORT}/`)
})


// curl -u b0254068a01a43123ab075d380332164348d4231: https://diageo-analyzer.integralzone.com/api/user_tokens/search

// curl -u adf3d00f6d75626f1d7ef37dd830395e749c65e0: https://diageo-analyzer.integralzone.com/api/user_tokens/search

// curl /api/issues/search?ps=1&projectKey=<PROJECT_KEY>&facets=types
