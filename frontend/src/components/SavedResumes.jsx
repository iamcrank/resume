import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setData, deleteData } from '../redux/actionCreators';
import { useNavigate } from "react-router-dom";


const Dashboard = (props) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        props.fetchData(props.token, function () {
            //navigate("/builder")
        });
    }, []); //eslint-disable-line

    const handleEdit = (index) => {
        props.setData(index, function () {
            navigate("/builder");
        });
    };

    const callDelete = async (index) => {
        await props.deleteData(props.token, props.resume.data[index]);
    };

    const handleDelete = (index) => {
        callDelete(index).then(() => {
            props.fetchData(props.token, function () {
                //navigate("/builder")  
            });
        });
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Saved Resumes
                    </Typography>
                    <Grid container spacing={8}>
                        {props.resume.data.length && props.resume.data.map((item, id) => (
                            <Grid item key={id} md={12} >
                                <Card className={classes.card} color="secondary">
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.actions}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() => { handleEdit(id) }}
                                            startIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={() => { handleDelete(id) }}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        resume: state.resume,
        token: state.resume.token
    };
};

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    setData: (props, callback) => { dispatch(setData(props, callback)) },
    deleteData: (token, resume) => { dispatch(deleteData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
