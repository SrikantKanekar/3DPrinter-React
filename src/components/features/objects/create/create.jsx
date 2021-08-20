import React, {Component} from 'react';
import Firebase from "../../../../services/firebaseService";
import objectService from "../../../../services/objectService";
import {toast} from "react-toastify";
import Button from "../../../util/button/button";
import Canvas from "../../../canvas/canvas";
import ProgressBar from "../../../util/progressBar/progressBar";
import {sliceAllQualities} from "./slicing/slice";
import "./create.css"

class Create extends Component {
    state = {
        uploading: false,
        dragging: false,
        slicing: false,
        uploadingFile: false,
        uploadingImg: false,
        done: false,

        filename: '',
        progress: 0,
        canvasVisible: false,

        formError: '',
        canvasError: '',
        sizeError: false
    }

    constructor(props) {
        super(props);
        this.canvas = React.createRef()
    }

    disableDefault = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragenter = (e) => {
        this.disableDefault(e)
        if (!this.state.uploading) {
            this.setState({dragging: true})
        }
    }

    handleDragleave = (e) => {
        this.disableDefault(e)
        this.setState({dragging: false})
    }

    handleDrop = (e) => {
        this.handleDragleave(e)
        if (!this.state.uploading) {
            this.file = e.dataTransfer.files[0]
            this.showCanvas()
        }
    }

    handleFileChange = (e) => {
        this.file = e.target.files[0];
        this.showCanvas();
    }

    handleRestart = (e) => {
        e.preventDefault()
        this.setState({formError: '', done: false})
    }

    handleObjectCreate = async (e) => {
        e.preventDefault()

        try {
            if (this.state.filename !== "") {

                this.slicingFile()

                const image = this.canvas.current.takeSnapshot();

                this.hideCanvas();

                const id = this.generateId();

                const slicing = await sliceAllQualities(
                    this.file,
                    progress => this.setState({progress})
                )

                this.uploadingFile();

                Firebase.uploadFirebaseFile(
                    this.file,
                    this.file.name,
                    id,
                    progress => this.setState({progress}),
                    fileUrl => {
                        this.uploadingImage();
                        Firebase.uploadFirebaseImage(
                            image,
                            id,
                            progress => this.setState({progress}),
                            async (imageUrl) => {

                                this.uploadingDone();
                                const request = {
                                    id: id,
                                    name: this.state.filename,
                                    fileUrl: fileUrl,
                                    imageUrl: imageUrl,
                                    fileExtension: this.getFileExtension(),
                                    slicing
                                }
                                try {
                                    const result = await objectService.create(request)
                                    this.props.history.replace("/objects/" + result.data.id)
                                } catch (ex) {
                                    this.showError(ex.response.data)
                                }
                            }
                        );
                    }
                );
            } else {
                toast.dark("Name cannot be empty")
            }
        } catch (e) {
            this.showError(e)
            toast.dark(e)
        }
    }

    handleObjectChange = (e) => {
        e.preventDefault();
        this.hideCanvas();
    }

    handleCanvasError = (e) => {
        this.setState({canvasError: e})
    }

    handleSizeError = () => {
        this.setState({sizeError: true})
    }

    render() {
        const {
            dragging,
            done,
            slicing,
            uploadingFile,
            uploadingImg,
            formError,
            progress,
            canvasVisible,
            sizeError,
            canvasError
        } = this.state

        const boxClass = "box " +
            `${dragging ? "is_dragover" : ""}` +
            `${slicing ? "is_slicing" : ""}` +
            `${uploadingFile ? "is_uploading_file" : ""}` +
            `${uploadingImg ? "is_uploading_img" : ""}` +
            `${done ? "is_done" : ""}` +
            `${formError ? "is_error" : ""}`

        return (
            <div className="container">

                {!canvasVisible && (
                    <form
                        className={boxClass}
                        onDrag={e => this.disableDefault(e)}
                        onDragStart={e => this.disableDefault(e)}
                        onDragEnter={e => this.handleDragenter(e)}
                        onDragOver={e => this.handleDragenter(e)}
                        onDragLeave={e => this.handleDragleave(e)}
                        onDragEnd={e => this.handleDragleave(e)}
                        onDrop={e => this.handleDrop(e)}
                    >

                        <div className="box_upload">
                            <svg className="box_icon"
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="50"
                                 height="43"
                                 viewBox="0 0 50 43">
                                <path
                                    d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/>
                            </svg>

                            <input
                                className="box_input"
                                type="file"
                                name="file"
                                id="file"
                                accept=".glb,.obj,.STL"
                                onChange={e => this.handleFileChange(e)}/>

                            <label htmlFor="file">
                                <strong>Choose a file</strong>
                                <span className="box_dragndrop"> or drag it here</span>.
                            </label>
                        </div>

                        <div className="box_slicing">Slicing…</div>
                        <div className="box_uploading_file">
                            Uploading {this.file ? this.file.name : ''}
                        </div>
                        <div className="box_uploading_img">Uploading Image…</div>
                        <div className="box_done">Almost Done!</div>
                        <div className="box_error">
                            <span>{this.state.formError}</span>. <a
                            href="/" className="box_restart"
                            onClick={e => this.handleRestart(e)}>Try again!</a>
                        </div>

                        <div className="progress_container">
                            <ProgressBar progress={progress}/>
                        </div>
                    </form>
                )}

                {canvasVisible && (
                    <div className="canvas">
                        <Canvas
                            ref={this.canvas}
                            file={this.file}
                            canvasError={e => this.handleCanvasError(e)}
                            sizeError={this.handleSizeError}/>

                        <div className="canvas_info">
                            <div
                                className="canvas_name"
                                contentEditable="true"
                                onChange={e => this.setState({filename: e.currentTarget.textContent})}
                                suppressContentEditableWarning={true}>
                                {this.state.filename}
                            </div>
                            {sizeError && (
                                <div className="canvas_size_error">
                                    Maximum dimension should be less than 200x200x250 mm
                                </div>
                            )}
                        </div>

                        <div className="canvas_buttons">
                            <Button
                                label="Change"
                                onClick={e => this.handleObjectChange(e)}
                            />
                            {!(canvasError || sizeError) && (
                                <Button
                                    label="Create"
                                    onClick={e => this.handleObjectCreate(e)}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    slicingFile() {
        this.setState({
            uploading: true,
            slicing: true,
            formError: ''
        })
    }

    uploadingFile() {
        this.setState({
            slicing: false,
            uploadingFile: true,
        })
    }

    uploadingImage() {
        this.setState({
            uploadingFile: false,
            uploadingImg: true
        })
    }

    uploadingDone() {
        this.setState({
            uploadingImg: false,
            done: true
        })
    }

    showError(formError) {
        this.setState({
            uploading: false,
            slicing: false,
            uploadingFile: false,
            uploadingImg: false,
            progress: 0,
            formError
        })
    }

    showCanvas() {
        this.setState({
            filename: this.file.name.replace(/\.[^/.]+$/, ""),
            canvasVisible: true
        })
    }

    hideCanvas() {
        this.setState({
            canvasVisible: false,
            canvasError: '',
            sizeError: false
        })
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getFileExtension() {
        const lastDot = this.file.name.lastIndexOf('.');
        return this.file.name.substring(lastDot + 1).toLowerCase();
    }
}

export default Create;