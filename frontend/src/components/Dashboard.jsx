import React from 'react'
import Profile from './Profile';
import SavedResumes from './SavedResumes';
import { connect } from 'react-redux';




const Dashboard = (props) => {

    const [content, setContent] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setContent(newValue);
    };

    function getContent(id) {
        switch (id) {
            case 0:
                return <Profile />;
            case 1:
                return <SavedResumes />;
            default:
                throw new Error('Unknown');
        }
    }

    return (
        <React.Fragment>
            <div className={classes.menu}>
                <Tabs
                    onChange={handleChange}
                    indicatorColor="default"
                    textColor="default"
                    centered
                >
                    <Tab className={classes.label} label="Profile" />
                    <Tab className={classes.label} disabled={(Array.isArray(props.resume.data)) ? '' : 'true'} label="Saved Resumes" />
                </Tabs>
            </div>
            <hr className={classes.line}></hr>
            {getContent(content)}
        </React.Fragment>
    )

}


const mapStateToProps = state => {
    return {
        resume: state.resume,
    }
}

export default connect(mapStateToProps)(Dashboard);