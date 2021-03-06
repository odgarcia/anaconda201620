import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import StarRatingComponent from 'react-star-rating-component';
import FaApple from 'react-icons/lib/fa/apple';
import { DEFAULT_IMAGE, SERVER_URL, SOUNDS_FILTER, SOUNDS_TYPE} from '../utils/constants';
import Loading from 'react-loading';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
const style = {
  margin: 12,
  labelColor: '#fff'
}
const startsFormatter = (cell, row) => {
  return (<StarRatingComponent
                      name="rate2"
                      editing={false}
                      renderStarIcon={() => <span><FaApple /></span>}
                      starCount={5}
                      value={cell}
                  />)
}

let filterVar = SOUNDS_FILTER.ALL;
let typeVar = SOUNDS_TYPE.SONG;

const translator = (varToFilter) => {
    switch(varToFilter){
        case 'all':
            return 'Todos';
            break;
        case 'recent':
            return 'Recientes';
            break;
        case 'rating':
            return 'Calificación';
            break;
        case 'album':
            return 'Albumes';
            break;
        case 'song':
            return 'Canciones';
            break;
        case 'sound':
            return 'Sonidos';
            break;
        default:
            return varToFilter;
            break;
    }
}

class IndexContent extends Component{
  constructor(props){
    super(props);
    this.coverImage = this.coverImage.bind(this);
  }
  componentDidMount(){
    console.log("IndexContent Mounted!")
    this.props.fetchSoundTracks(SOUNDS_FILTER.ALL, SOUNDS_TYPE.SONG);
  }

  closeModal() { this.setState({ showModal: false }); }
  openModal() { this.setState({ showModal: true }); }

  coverImage(cell,row){
    return (<img src={cell || DEFAULT_IMAGE} alt={cell} className='coverImage'/>)
  }
  render(){
          return(
      <div id = "twitter" className="index-content">

          <SweetAlert
              show={this.props.saModal.show}
              type={this.props.saModal.type}
              title={this.props.saModal.title}
              text={this.props.saModal.text}
              onConfirm={() => this.props.hideSAModal()}
          />
          <div className="row">
            <div className="border col-sm-12" >
                <center>
                <h3>Nuestros Sonidos de Moda</h3>
                    </center>
                <br></br>
            </div>
          </div>
          <div className="row" >
            <div className="col-sm-push-1 col-sm-10 col-xs-12 " >
              <DropdownButton id="soundsFilterDropdown" title={translator(filterVar)} onSelect={this.soundsFilterDropdownChange.bind(this)}>
                <MenuItem eventKey={SOUNDS_FILTER.ALL}>{translator(SOUNDS_FILTER.ALL)}</MenuItem>
                <MenuItem eventKey={SOUNDS_FILTER.RATING}>{translator(SOUNDS_FILTER.RATING)}</MenuItem>
                <MenuItem eventKey={SOUNDS_FILTER.RECENT}>{translator(SOUNDS_FILTER.RECENT)}</MenuItem>
              </DropdownButton>
              <DropdownButton id="soundsTypeDropdown" title={translator(typeVar)} onSelect={this.soundsTypeDropdownChange.bind(this)}>
                <MenuItem eventKey={SOUNDS_TYPE.ALBUM}>{translator(SOUNDS_TYPE.ALBUM)}</MenuItem>
                <MenuItem eventKey={SOUNDS_TYPE.SONG}>{translator(SOUNDS_TYPE.SONG)}</MenuItem>
                <MenuItem eventKey={SOUNDS_TYPE.SOUND}>{translator(SOUNDS_TYPE.SOUND)}</MenuItem>
              </DropdownButton>
              <RaisedButton label="Reproducir Contenido"
              labelColor={style.labelColor}
              style={style}
              backgroundColor="#a4c639"
              icon={<PlayArrow color={fullWhite} />}
              onClick={()=>{
              this.props.changedSongs(this.props.soundtracks.sounds)}
              } />
                {this.props.soundtracks? <BootstrapTable data={this.props.soundtracks.sounds } striped={true} hover={true}>
                 <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                 <TableHeaderColumn dataField="cover" dataFormat={this.coverImage} >Cover</TableHeaderColumn>
                 <TableHeaderColumn dataField="sound" dataAlign="center" dataSort={true}>Sonido</TableHeaderColumn>
                 <TableHeaderColumn dataField="type" dataSort={true}>Tipo</TableHeaderColumn>
                 <TableHeaderColumn dataField="artist" dataSort={true}>Artista</TableHeaderColumn>
                 <TableHeaderColumn dataField="rating"  dataSort={true} dataFormat={startsFormatter} >Rating</TableHeaderColumn>
                 <TableHeaderColumn dataField="likes"  dataSort={true} >Likes</TableHeaderColumn>
             </BootstrapTable> : <center><h1>Cargando tus sonidos favoritos</h1><br></br><Loading type='bars' color='#1A237E'></Loading></center>}

            </div>
          </div>
        </div>
      );
    }

    soundsFilterDropdownChange(selectedFilter){
        filterVar = selectedFilter;
        this.props.fetchSoundTracks(filterVar, typeVar);
    }

    soundsTypeDropdownChange(selectedType){
        typeVar = selectedType;
        this.props.fetchSoundTracks(filterVar, typeVar);
    }
}

export default IndexContent;
