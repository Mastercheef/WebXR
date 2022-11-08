import Link from "next/link"

const Navbar = () => {

	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-brand">
					<a className="navbar-item" href="../">
						<h1>Content Manager</h1>
					</a>
					<span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
				</div>
				<div id="navbarMenu" className="navbar-menu">
					<div className="navbar-end">
						<div className=" navbar-item">
							<div className="control has-icons-left">
								<input className="input is-rounded" type="email" placeholder="Search"/>
								<span className="icon is-left">
                    <i className="fa fa-search"></i>
                  </span>
							</div>
						</div>
						<a className="navbar-item is-active is-size-5 has-text-weight-semibold">
							Home
						</a>
						<Link href="/login">
						<a className="navbar-item is-size-5 has-text-weight-semibold">
							Login
						</a>
						</Link>
						<a className="navbar-item is-size-5 has-text-weight-semibold">
							Feature
						</a>
					</div>
				</div>
			</div>
		</nav>
	);

}

export default Navbar;