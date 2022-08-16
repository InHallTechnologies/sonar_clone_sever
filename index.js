const { default: axios } = require('axios');
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors');
const router = require('./routes/izanalyser');
const mailRouter = require('./routes/mail-handler');

app.use(cors());
app.use('/izanalyser',router)
app.use('/send-mail', mailRouter)

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

app.get('/project-last-analysis', async (req, res) => {
    const { projectKey } = req.query;
    const response = await axios.get('https://sonarcloud.io/api/projects/search', {
        params: {
            'organization': 'diageoglobalcms',
            "projects": projectKey
        },
        auth: {
            username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
        }
    });
    res.send(response.data.components[0])
})

app.get('/project-languages', async (req, res) => {
    const { projectKey } = req.query;
    try {
        const response = await axios.get('https://sonarcloud.io/api/languages/list', {
            params: {
                's': "name",
                'q': "r"
            },
            auth: {
                username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
            }
        });
        res.send(response.data)
    }catch(err) {
        res.send(err)
    }
   
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

        const response = await axios.get('https://sonarcloud.io/api/project_badges/quality_gate', {
            auth: {
                username: 'adf3d00f6d75626f1d7ef37dd830395e749c65e0'
            },
            params: {
                'project':'cms-60622fargate_diageotest_com',
                'metric': 'duplicated_lines_density',
                'token': 'adf3d00f6d75626f1d7ef37dd830395e749c65e0',
                'organization': 'diageoglobalcms'
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

app.get('/project-metadata', async (req, res) => {
    
})


app.listen(PORT, () => {
    console.log(`Server is running at url: http://localhost:${PORT}/`)
})


// curl -u b0254068a01a43123ab075d380332164348d4231: https://diageo-analyzer.integralzone.com/api/user_tokens/search

// curl -u adf3d00f6d75626f1d7ef37dd830395e749c65e0: https://diageo-analyzer.integralzone.com/api/user_tokens/search

// curl /api/issues/search?ps=1&projectKey=<PROJECT_KEY>&facets=types


// curl -L -v -u adf3d00f6d75626f1d7ef37dd830395e749c65e0: https://sonarcloud.io/api/project_badges/measure?project=cms-60622fargate_diageotest_com&metric=duplicated_lines_density