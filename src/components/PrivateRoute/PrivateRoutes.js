import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ user, isLoading }) => {
	if (!user && !isLoading) {
		return <Navigate to='/' replace />;
	}
	return <Outlet />;
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isLoading: state.auth.loading,
});

export default connect(mapStateToProps, {})(PrivateRoutes);
