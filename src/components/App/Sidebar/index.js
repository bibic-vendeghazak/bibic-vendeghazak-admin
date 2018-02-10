import React, {Component} from 'react'

import Badge from 'material-ui/Badge'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'

import Logout from '../Auth/Logout'

const dividerStyle = {
	backgroundColor: "rgba(255,255,255,.5)"
}


export default class Sidebar extends Component {

	render() {
		const {profile, unreadReservationCount,
			unreadFeedbackCount, handleLogout, isDrawerOpened, changeOpenedMenuItem, toggleSidebar} = this.props
			
		return (
			<aside onClick={() => window.innerWidth <= 768 && toggleSidebar()} id="sidebar">
				<Drawer  open={isDrawerOpened} containerStyle={{height: 'calc(100% - 64px)', top: 64}}>
				<Profile {...{profile}}/>
				<Divider style={dividerStyle}/>
					<SidebarMenuItem
						primaryText="Kezdőlap"
						leftIcon="home"
						onClick={() => changeOpenedMenuItem("welcome", ["bug_report","Hiba jelentése"])}
					/>
					<SidebarMenuItem
						primaryText="Irány a weblap"
						leftIcon="language"
						href="https://bibic-vendeghazak.github.io/bibic-vendeghazak-web/"
					/>
					<Divider style={dividerStyle}/>
					<SidebarMenuItem
						primaryText="Szobák"
						leftIcon="business"
						onClick={() => changeOpenedMenuItem("rooms")}
						/>
					<SidebarMenuItem
						primaryText="Foglalások"
						leftIcon="bookmark_border"
						onClick={() => changeOpenedMenuItem("reservations", ["filter_list", "Szűrő mutatása/elrejtése"])}
						count={unreadReservationCount}
						/>
					<SidebarMenuItem
						primaryText="Naptár"
						leftIcon="event"
						onClick={() => changeOpenedMenuItem("calendar", ["event", "Ugrás erre: Ma"])}
						/>
					<SidebarMenuItem
						primaryText="Statisztikák"
						leftIcon="trending_up"
						onClick={() => changeOpenedMenuItem("stats")}
						/>
					<SidebarMenuItem
						primaryText="Visszajelzések"
						leftIcon="feedback"
						onClick={() => changeOpenedMenuItem("feedbacks")}
						count={unreadFeedbackCount}
						/>
				<Divider style={dividerStyle}/>
				<SidebarMenuItem
					primaryText="Beállítások"
					leftIcon="settings"
					onClick={() => changeOpenedMenuItem("settings")}
				/>
				
				<Logout {...{handleLogout}}/>
				</Drawer>
			</aside>
		)}
}


const Profile = ({profile}) => (
	<div className="profile">
		<h3>{profile ? profile.name : "Bíbic vendégházak"}</h3>
		<Avatar className="avatar"
			src={profile ?
				 `https://bibic-vendeghazak.github.io/bibic-vendeghazak-web/assets/images/other/${profile.src}.jpg`:
				  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAOUlEQVR42u3OIQEAAAACIP1/2hkWWEBzVgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYF3YDicAEE8VTiYAAAAAElFTkSuQmCC"}
			size={64}
		/>
	</div>
)


const SidebarMenuItem = ({primaryText, leftIcon, count, href, onClick}) => (
	<MenuItem
		style={{color: "white"}} 
		primaryText={primaryText}
		leftIcon={<FontIcon style={{color: "#fff"}} className="material-icons">{leftIcon}</FontIcon>}
		rightIcon={count ? <Badge primary badgeContent={count.toString()}/> : null}
		onClick={() => onClick && onClick()}
		href={href}
		target={href && "_blank"}
		rel={href && "noopener noreferrer"}
	/>
)