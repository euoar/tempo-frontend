import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { CIDADES } from '../../utils/constants';

class NavigationBar extends React.Component {
    constructor(props) {
        super();
        this.toggle = this.toggle.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="md" fixed="top">
                    <NavbarBrand className="mr-auto" tag={Link} to="/">Chove?</NavbarBrand>
                    <NavbarToggler className="ml-auto" onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav>
                            {
                                /* Creamos los elementos del Dropdown */
                                CIDADES.map((cidade, index) => {
                                    let search = "?coords=" + CIDADES[index].coordinates + "&idZona=" + CIDADES[index].idZona + "&location=" +
                                        CIDADES[index].name + "&type=" + CIDADES[index].type;

                                    return <NavItem className="bg-dark d-flex" key={cidade.name}>
                                        <NavLink tag={Link} className="nav-link align-middle text-white" to={{pathname: '/forecast', search: `${search}`
                                        }}>
                                            {cidade.name}
                                        </NavLink>
                                    </NavItem>
                                }
                                )
                            }
                            {
                                <NavItem className="bg-dark d-flex" key={'windy'}>
                                    <NavLink tag={Link} className="nav-link align-middle text-white" 
                                    to={{ pathname: '/windy'}}>
                                        Windy
                                    </NavLink>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                    {
                        this.props.children
                    }
                </Navbar>
            </React.Fragment >
        );
    }
}


export default NavigationBar;