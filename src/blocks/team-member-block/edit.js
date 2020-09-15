import { Component } from "@wordpress/element";
import {
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	URLInput
} from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	Toolbar,
	IconButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Dashicon,
	Tooltip,
	TextControl
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";

class TeamMemberEdit extends Component {
	state = {
		selectedLink: null
	};

	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { url, id } = attributes;

		if (url && isBlobURL(url) && !id) {
			setAttributes({
				url: "",
				alt: ""
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isSelected && !this.props.isSelected) {
			this.setState({
				selectedLink: null
			});
		}
	}

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeInfo = info => {
		this.props.setAttributes({ info });
	};

	onSelectImage = ({ id, url, alt }) => {
		this.props.setAttributes({ id, url, alt });
	};

	onSelectUrl = url => {
		this.props.setAttributes({
			url,
			id: null,
			alt: ""
		});
	};

	onImageUploadError = message => {
		const { noticeOperations } = this.props;
		noticeOperations.createErrorNotice(message);
	};

	removeImage = () => {
		this.props.setAttributes({
			id: "",
			url: "",
			alt: ""
		});
	};

	updateAlt = alt => {
		this.props.setAttributes({ alt });
	};

	getImageSizes = () => {
		const { image, imageSizes } = this.props;
		if (!image) return [];

		let options = [];
		const sizes = image.media_details.sizes;

		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find(size => size.slug === key);

			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url
				});
			}
		}
		return options;
	};

	addNewLink = () => {
		const { setAttributes, attributes } = this.props;
		const { social } = attributes;
		setAttributes({
			social: [...social, { icon: "wordpress", link: "" }]
		});
		this.setState({
			selectedLink: social.length
		});
	};

	onImageSizeChange = url => {
		this.props.setAttributes({ url });
	};

	render() {
		const { className, attributes, noticeUI, isSelected } = this.props;
		const { title, info, url, alt, id, social } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__("Image Settings", "team-member-block")}
					>
						{url && !isBlobURL(url) && (
							<TextareaControl
								label={__(
									"Alt Text ( Alternative Text )",
									"team-member-block"
								)}
								value={alt}
								onChange={this.updateAlt}
								help={__(
									"Alternative Text describes your image to people who can't see it. Add a short description with it's key details.",
									"team-member-block"
								)}
							/>
						)}
						{id && (
							<SelectControl
								label={__("Image Size", "team-member-block")}
								options={this.getImageSizes()}
								onChange={this.onImageSizeChange}
								value={url}
							/>
						)}
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					{url && (
						<Toolbar>
							{id && (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={this.onSelectImage}
										allowedTypes={["image"]}
										value={id}
										render={({ open }) => {
											return (
												<IconButton
													className="components-icon-button components-toolbar__control"
													onClick={open}
													icon="edit"
													label={__(
														"Edit Image",
														"team-member-block"
													)}
												/>
											);
										}}
									/>
								</MediaUploadCheck>
							)}
							<IconButton
								className="components-icon-button components-toolbar__control"
								onClick={this.removeImage}
								icon="trash"
								label={__("Remove Image", "team-member-block")}
							/>
						</Toolbar>
					)}
				</BlockControls>
				<div className={className}>
					{url ? (
						<>
							<img src={url} alt={alt} />
							{isBlobURL(url) && <Spinner />}
						</>
					) : (
						<MediaPlaceholder
							icon="format-image"
							onSelect={this.onSelectImage}
							onSelectURL={this.onSelectUrl}
							onError={this.onImageUploadError}
							accept="image/*"
							allowedTypes={["image"]}
							notices={noticeUI}
						/>
					)}
					<RichText
						className={
							"wp-block-team-member-block-team-member__title"
						}
						tagName="h4"
						onChange={this.onChangeTitle}
						value={title}
						placeholder={__("Member Name", "team-member-block")}
						formattingControls={[]}
					/>
					<RichText
						className={
							"wp-block-team-member-block-team-member__info"
						}
						tagName="p"
						onChange={this.onChangeInfo}
						value={info}
						placeholder={__("Member Info", "team-member-block")}
						formattingControls={[]}
					/>
					<div
						className={
							"wp-block-team-member-block-team-member__social"
						}
					>
						<ul>
							{social.map((item, index) => {
								return (
									<li
										className={
											this.state.selectedLink === index
												? "is-selected"
												: null
										}
										key={index}
										onClick={() =>
											this.setState({
												selectedLink: index
											})
										}
									>
										<Dashicon icon={item.icon} size={16} />
									</li>
								);
							})}
							{isSelected && (
								<li
									className={
										"wp-block-team-member-block-team-member__addIconLI"
									}
								>
									<Tooltip
										text={__(
											"Add Item",
											"team-member-block"
										)}
									>
										<button
											className="wp-block-team-member-block-team-member__addIconLI"
											onClick={this.addNewLink}
										>
											<Dashicon icon={"plus"} size={14} />
										</button>
									</Tooltip>
								</li>
							)}
						</ul>
					</div>
					{this.state.selectedLink !== null && (
						<div
							className={
								"wp-block-team-member-block-team-member__linkForm"
							}
						>
							<TextControl
								label={__("Icon", "team-member-block")}
							/>

							<URLInput label={__("URL", "team-member-block")} />

							<a
								className={
									"wp-block-team-member-block-team-member__removeLink"
								}
							>
								{__("Remove Link", "team-member-block")}
							</a>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default withSelect((select, props) => {
	const id = props.attributes.id;
	return {
		image: id ? select("core").getMedia(id) : null,
		imageSizes: select("core/editor").getEditorSettings().imageSizes
	};
})(withNotices(TeamMemberEdit));
