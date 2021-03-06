$(document).ready(() => {
        
        let count = 0;

        let location = [
            'wTWfy9g5ix6zW6LhIg5G',
        ];

        location = '';

        // Color Scheme Choices
        let colorScheme = [
            {
                name: "Dark Green",
                enable: false,
                className: "dark-green",
                light_color: '#FFF',
                highlight_color: '#00C0B0', 
                dark_color: '#1D1D1D',
                darker_color: '#121212'
            },
            {
                name: "Blue Grey",
                enable: false,
                className: 'blue-grey',
                light_color: '#FFF',
                highlight_color: '#B5ECA0',
                dark_color: '#2E445B',
                darker_color: '#102A43'
            },
            {
                name: "Cool Brown",
                enable: false,
                className: 'cool-brown',
                light_color: '#FFF',
                highlight_color: '#F1CBA6',
                dark_color: '#3A434C',
                darker_color: '#1F2933'
            },
            {
                name: "Custom Color Scheme",
                enable: true,
                className: 'custom-color-scheme',
                light_color: '#FFF',
                highlight_color: '#5E3794',
                dark_color: '#1D1D1D',
                darker_color: '#121212',
                gradient_color: 'linear-gradient(135deg, #f1646d 0%,#5164b0 100%)',
                darker_text_color: '#9d9fa0',
                highlight_color_1: '#E07B80',
                darker_text_color_1: '#5164b0'
            }
        ];

        // let interval = setInterval(() => {

        //     let currentLocation = null;

        //     if(location.length > 0) {
        //         let find = location.find((attr) => {
        //             return location == window.location.pathname.split('/')[2] ? location : false;
        //         });

        //         if(find) {

        //             // set up toggle
        //             let is_content_created = $('#app > div:nth-child(2)');

        //             if(is_content_created.hasClass(find)) {
        //                 initToggle();
        //                 clearInterval(interval)
        //             }
        //         }
        //     }
        //     else {
        //         initToggle();
        //         clearInterval(interval)
        //         return;
        //     }
            

        //     let is_admin = $('#app > div:nth-child(2)');

        //     if(is_admin.hasClass('undefined')) {
        //         initToggle();
        //         localStorage.setItem("toggle", 'true');
        //         clearInterval(interval);
        //         return;
        //     }

        //     if(localStorage.getItem('toggle') == 'true') {
        //         initToggle();
        //         clearInterval(interval);
        //         return;
        //     }

        //     if(count == 10) {
        //         clearInterval(interval);
        //     } 

        //     count++;
            
        // }, 2000);

        setTimeout(() => {
			let dark_mode = JSON.parse(localStorage.getItem('Dark Mode'));
			if(dark_mode == true) {
                let getColorSchemeSetup = JSON.parse(localStorage.getItem('color-scheme-setup'));
                console.log(getColorSchemeSetup)
                setDarkModeStyle(getColorSchemeSetup);
			}
		}, 3000)


        /*$('body').on('click', '#nav-settings', () => {

    		if($('#custom-card.dark-mode-settings').length > 0) {
        		return;
        	}

    		let createEl_1 = `
        		<div id="custom-card.dark-mode-settings">

        		</div>
        	`;
			$('#app #settings.hl_settings > .hl_settings--header').after(createEl_1);
			initToggle();
		});*/

		setInterval(() => {
    		
    		let agency_curr_path = window.location.pathname.split('/')[1];
    		let sub_curr_path = window.location.pathname.split('/')[3];

    		if(agency_curr_path || sub_curr_path) {
    			if($('.custom-card.dark-mode-settings').length > 0) {
	        		return;
	        	}

	    		let createEl_1 = `
	        		<div class="custom-card dark-mode-settings" style="width: 50%; float: left;">

	        		</div>
	        	`;
				$('#app #settings.hl_settings > .hl_settings--header').after(createEl_1);
				initToggle();
    		}
    		console.log('interval')
    	}, 3000);




        // Creating a Toggle Button
        function initToggle () {

            let getLocalStorage = JSON.parse(localStorage.getItem('color-scheme-setup'));
            let getSetupColorScheme;

            if(getLocalStorage) {
                getSetupColorScheme = getLocalStorage;   
            }
            else {
                getSetupColorScheme = colorScheme.find((attr) => {
                    return attr.enable == true;
                });
            }

            $('#app .custom-card.dark-mode-settings').html(displayToggle());

            $('.toggle-container').on('change', '#toggle_dark_mode', function() {
                let getColorSchemeSetup = JSON.parse(localStorage.getItem('color-scheme-setup'));

                if(!getColorSchemeSetup) {
                    getColorSchemeSetup = getSetupColorScheme;
                }

                if($(this).is(":checked")) {
                	console.log('true')
                    localStorage.setItem("Dark Mode", 'true');
                    // $('html > body').addClass(getColorSchemeSetup.className);
                }
                else {
                	console.log('false')
                    localStorage.setItem("Dark Mode", 'false');
                    $('html > body').removeClass('custom-color-scheme');
                    $('html > body').removeClass('cool-brown');
                    $('html > body').removeClass('dark-green');
                    $('html > body').removeClass('blue-grey');

                    return;
                }
                
                setDarkModeStyle(getColorSchemeSetup);
            });

            $('.select-darkmode').on('change', 'select.toggle-darkmode', function () {
                $('html > body').removeClass('custom-color-scheme');
                $('html > body').removeClass('cool-brown');
                $('html > body').removeClass('dark-green');
                $('html > body').removeClass('blue-grey');
                $('html > body').addClass(this.value);
                let selected = this.value;

                let getColorScheme = colorScheme.map((data) => {

                    if(data.enable == true) {
                        data.enable = false;
                    }

                    return data;

                }).find((attr) => {
                    if(attr.className == selected) {
                        attr.enable = true;
                        return attr;
                    }
                }) 

                if(localStorage.getItem('Dark Mode') == 'true') {
                    setDarkModeStyle(getColorScheme);
                }

                localStorage.setItem('color-scheme-setup', JSON.stringify(getColorScheme));
            })


            initDarkMode(getSetupColorScheme);
            $('select.toggle-darkmode').val(getSetupColorScheme.className);
        }

        function initDarkMode(colorScheme) {

            let get_dark_mode = localStorage.getItem('Dark Mode');

            if(get_dark_mode == 'true') {

                $('.toggle-container > #toggle_dark_mode').attr('checked', true);
                setDarkModeStyle(colorScheme);
                return;
            }
           
            $('html > body').removeClass(colorScheme.className);
        
        }

        function setDarkModeStyle (colorScheme) {
        	console.log('test');
            if($('html > body').hasClass(colorScheme.className) == true) {
            	return;
            }
        	console.log('teasdas');
            $('html > body').addClass(colorScheme.className);
            styles(colorScheme)
        }

        function displayToggle () {
            let dom;
            dom = `
            <div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="card" id="darkmode-toggle">
			            	<div class="card-header">
								<h3>Dark Mode</h3>
			            	</div>

			            	<div class="card-body">
							    <div class="mb-3">
								    <label class="form-label">Select Color Scheme</label>
								    <div class="select-darkmode">
					                    <select class="toggle-darkmode">
					                        <option value="dark-green">Dark Green</option>
					                        <option value="blue-grey">Blue Grey</option>
					                        <option value="cool-brown">Cool Brown</option>
					                        <option value="custom-color-scheme">Custom Color Scheme</option>
					                    </select>
					                </div>
							  	</div>
							    <div class="mb-3">
								    <label class="form-label">Enable Dark Mode</label>
								    <div class="toggle-container">
					                    <input type="checkbox" id="toggle_dark_mode" />
					                    <div class="slider round"></div>
					                    <!--<div class="styles"></div>-->
					                </div>
							  	</div>
			            	</div>
		            	</div>
					</div>
				</div>
			</div>

            ${toggleStyle()}
            `;


            // toggleStyle();

            return dom;
        }

        function toggleStyle () {
            
            let styles;

            styles = `
                <style>
                    .select-darkmode {
                        position: relative;
                        z-index: 9;
                        width: 160px;
                        height: 40px;
                        pointer-events: none;
                        user-select: none;
                        cursor: pointer;
                    }
                    select.toggle-darkmode {
                        width: 100%;
                        height: 100%;
                        pointer-events: all;
                        cursor: pointer;
                        outline: none;
                        background: #5266AF;
                        border-radius: 50px;
                        padding: 0 15px;
                        font-weight: bold;
                        border: 0;
                        text-transform: uppercase;
                        color: #fff;
                    }
                    .toggle-container {
                        position: relative;
                        z-index: 999;
                        width: 60px;
                        height: 25px;
                        pointer-events: none;
                        user-select: none;
                        cursor: pointer;
                    }

                    .toggle-container input {
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: all;
                        cursor: pointer;
                    }

                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #f1f1f1;
                        border: 1px solid #dbdbdb;
                        transition: 0.4s;
                        pointer-events: none;
                    }

                    .slider::before {
                        position: absolute;
                        content: "";
                        height: 25px;
                        width: 25px;
                        left: -1px;
                        bottom: -1px;
                        background-color: #5164b0;
                        transition: 0.2s;
                        pointer-events: none;
                    }
                    .slider::after {
                        position: absolute;
                        content: "\\f185";
                        right: 8px;
                        transition: 0.2s;
                        color: #5164b0;
                        pointer-events: none;
                        font-family: 'Font Awesome 5 Free';
                        font-size: 18px !important;
                        top: -5px !important;
                    }

                    input:checked + .slider {
                        background-color: #f1f1f1;
                    }

                    input:checked + .slider:before {
                        transform: translateX(40px);
                    }

                    input:checked + .slider:after {
                        content: "\\f186";
                        left: 10px;
                        font-family: 'Font Awesome 5 Free';
                        font-size: 20px;
                        top: 2px;
                    }

                    .slider.round {
                        border-radius: 34px;
                    }

                    .slider.round:before {
                        border-radius: 50%;
                    }
                    @media only screen and (max-width: 767px) {
                        .toggle-container {
                            position: absolute !important;
                            top: 2px !important;
                        }
                        .select-darkmode {
                            position: absolute !important;
                            top: 2px !important;
                            right: 45.5% !important;
                        }
                    }
                </style>
            `;

            // $('.btn.btn-circle.btn-primary.hl_header--copy-link').removeAttr("style");

            
            // $('html > head').append(styles);
            return styles;
        }
        
        function styles (colorScheme) {

            let {
                light_color,
                highlight_color,
                dark_color,
                darker_color,
                gradient_color,
                className,
                darker_text_color,
                highlight_color_1,
                darker_text_color_1
            } = colorScheme;

            let style = `
            	body.${className} {
            		background: ${darker_color} !important;
            	}
            	.${className} h1,
            	.${className} h2,
            	.${className} h3,
            	.${className} h4,
            	.${className} h5,
            	.${className} h6 {
            		color: ${highlight_color_1} !important;
            	}

            	.${className} hr {
            		border-color: ${highlight_color_1};
            	}

            	/* START SIDE BAR */
            	.${className} .hl_navbar {
            		background: ${dark_color} !important;
            	}

            	.${className} .hl_navbar--links>li .nav-marketing-links ul {
            		background-color: ${darker_color} !important; 
            	}
                .${className} .hl_navbar--links>li .nav-dropdown-links, 
                .${className} .hl_navbar--links>li .nav-marketing-links {
                	border-color: ${highlight_color_1};
                }
            	/* END SIDE BAR */

            	/* START HEADER */
                .${className} .hl_header .container-fluid {
                	background: ${dark_color} !important;
                	border-bottom: 1px solid ${highlight_color_1};
                }
                .${className} .btn.btn-green-dark {
            	    background: ${gradient_color} !important;
    				border-color: unset !important;
    				color: ${light_color} !important;
                }
                .${className} .hl_header {
                	border: 0 !important;
                }
                .${className} .hl_header .filter-option-inner {
                	color: ${light_color} !important;
                }
                .${className} .hl_header div.avatar_img, 
                .${className} .hl_header a.btn.btn-circle.btn-primary.hl_header--copy-link>svg>path, 
                .${className} .hl_header a.btn.btn-circle.btn-primary.hl_header--copy-link, 
                .${className} .hl_header span.btn.btn-circle.btn-green-lt, 
                .${className} .hl_header a#recent_activities-toggle.btn.btn-circle.btn-yellow.hl_header--recent-activities, 
                .${className} .hl_header a.btn.btn-circle.btn-primary.hl_header--copy-link {
                	background: ${gradient_color} !important;
    				border-color: unset !important;
    				color: ${light_color} !important;
                }
                .${className} .hl_header .dropdown.bootstrap-select.hl_header--picker.fit-width.show>button {
                	background: ${gradient_color} !important;
    				border-color: unset !important;
    				color: ${light_color} !important;
    				padding: 0 15px !important
                }
                .${className} .bootstrap-select .dropdown-menu {
				    background: ${dark_color} !important;
				    top: 24px !important;
				    left: 0 !important;
				    max-width: 100% !important;
				}
                .${className} .bootstrap-select .dropdown-menu::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #383838;
                }
                .${className} .bootstrap-select .dropdown-menu::-webkit-scrollbar {
                    width: 12px;
                    background-color: #383838;
                }
                .${className} .bootstrap-select .dropdown-menu::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background: ${gradient_color};
                }
                .${className} .trigger-name {
				    border-color: ${highlight_color_1} !important;
				    color: ${light_color} !important;
				}
				.${className} .trigger-name::placeholder {
					color: ${light_color} !important;
				}
				.${className} .hl_header--picker>.dropdown-menu .inner .dropdown-menu li a {
				    border-bottom: 1px solid ${highlight_color_1};
				    color: ${light_color} !important;
				}
				.${className} .dropdown .dropdown-menu .dropdown-item:hover {
					background: #5164B0 !important;
				}
				.${className} .hl_header--recent-activities.-notification:before {
				    color: ${light_color} !important;
				    background: ${light_color} !important;
				}
            	/* END HEADER */

            	/* START CONTENT */
            	.${className} .hl_wrapper--inner {
            		background: ${darker_color} !important;
            	}


            	.${className} .card {
            		background: ${dark_color} !important;
            	}
            	.${className} #dashboard .hl_dashboard--conversion-rate .card-header, 
            	.${className} #dashboard .hl_dashboard--matters-added .card-header, 
            	.${className} #dashboard .hl_dashboard--pipeline-value .card-header, 
            	.${className} #dashboard .hl_dashboard--sales-funnel .card-header,
            	.${className} #dashboard .hl_dashboard--need-action .card-header,
            	.${className} #dashboard.hl_dashboard .card-header {
            		background: ${dark_color} !important;
            		border: 0;
            		border-bottom: 1px solid ${highlight_color_1} !important;
            	}
            	.${className} .hl_dashboard--conversion-rate .card-body, 
            	.${className} .hl_dashboard--matters-added .card-body, 
            	.${className} .hl_dashboard--pipeline-value .card-body {
            		background: ${dark_color} !important;
            		border-bottom: 1px solid ${highlight_color_1} !important;
            	}
            	.${className} .card-header h2, 
            	.${className} .card-header h3 {
				    color: ${light_color} !important;
            	}
            	.${className} .hl_dashboard--conversion-rate .bottom-stats li strong, 
            	.${className} .hl_dashboard--matters-added .bottom-stats li strong, 
            	.${className} .hl_dashboard--pipeline-value .bottom-stats li strong {
				    color: ${highlight_color_1} !important;
				}
				.${className} #dashboard .hl_tasks-list button.dropdown-toggle {
					background: ${gradient_color} !important;
					color: ${light_color} !important;
				}
				.${className} .bootstrap-select .dropdown-toggle .filter-option-inner .filter-option-inner-inner {
					color: ${light_color};
				}
				.${className} .dropdown .dropdown-menu {
					background: ${dark_color} !important;
				}
				.${className} .dropdown .dropdown-menu .dropdown-item {
					color: ${light_color} !important;
					width: 100%;
				}
				.${className} .card-body {
					background: ${dark_color};
				}
				.${className} g.highcharts-legend tspan {
				    color: ${light_color} !important;
				    fill: ${light_color};
				}
				.${className} .pending-manual-actions .card-body .pending-task-value-col div,
				.${className} .task-list-card .text-center,
				.${className} .task-list-card .text-center i {
					color: ${light_color};
				}
				.${className} .table thead tr th {
				    background: ${dark_color} !important;
				    background-color: ${dark_color} !important;
				    color: ${highlight_color_1} !important;
				}
				.${className} .table tbody tr td {
				    color: ${light_color};
				    border-color: ${highlight_color_1};
				}
				.${className} .card-header h2 span, 
				.${className} .card-header h3 span {
					color: ${highlight_color_1} !important;
				}
				.${className} .hl_dashboard--reviews-stats p {
				    color: ${light_color};
				}
				.${className} .hl_dashboard--avg-rating .rating_percentage p {
					color: ${light_color};
				}
				.${className} .hl_dashboard--avg-rating .rating_stats-item .progress {
				    background: ${gradient_color} !important;
				}
				.${className} .hl_dashboard--avg-rating .rating_stats-item h4 .icon {
				    color: #ffbc00 !important;
				}
				.${className} .sentiment_review-graph .percentage {
					background: unset !important;
				}
				.${className} .sentiment_review.--positive p,
				.${className} .sentiment_review.--negative p,
				.${className} .invites-goal_progress p {
					color: ${light_color};
				}
				.${className} .semi-progress .bar {
					border-color: ${gradient_color};
				}
				.${className} .shortcuts-container {
					background: ${dark_color};
					border-color: ${highlight_color_1};
				}
                .${className} .datepicker-container .calendar,
                .${className} .year-month-selector {
					background: ${dark_color};
				}
				.${className} .datepicker-container .datepicker-days .datepicker-day .datepicker-day-text {
				    color: ${darker_text_color_1};
				}
				.${className} .datepicker-buttons-container {
					background: ${dark_color};
					border-color: ${highlight_color_1};
				}
				.${className} .datepicker-buttons-container .datepicker-button {
					background: ${gradient_color} !important;
					border: unset !important;
				}
				.${className} .datepicker-buttons-container .datepicker-button svg {
					color: ${light_color};
					fill: ${light_color} !important;
				}
				.${className} .shortcuts-container button.shortcut-button {
					border: unset;
				}
				.${className} .header-picker {
					border-color: ${highlight_color_1};
				}
				.${className} .custom-button.with-border {
					border: unset;
				}
				.${className} .datetimepicker .datepicker {
					background: ${dark_color};
				}
            	/* END CONTENT */

            	/* START CONVERSATION */
            	.${className} .hl_conversations--messages-list .nav-tabs,
            	.${className} .messages-list-header,
            	.${className} .messages-list-search,
            	.${className} .messages-list,
            	.${className} .hl_conversations--message-header,
            	.${className} .message-body--aside,
            	.${className} .message-body--aside .btn-sched-wrap {
				    background: ${dark_color} !important;
				    background-color: ${dark_color} !important;
			        box-shadow: none;
				}
            	.${className} .hl_conversations--messages-list .nav-tabs,
            	.${className} .messages-list-search,
            	.${className} .select-user,
            	.${className} .messages-list--item,
            	.${className} .hl_conversations--message-header,
            	.${className} .message-body--aside {
				    border-bottom: 1px solid ${highlight_color_1} !important;
            	}
				.${className} .hl_wrapper--inner .nav.nav-tabs .nav-link:not(.active) {
					color: ${light_color} !important;
				}
				.${className} .select-user {
					color: ${light_color};
					margin-top: 0 !important;
					background: ${dark_color};
				    padding: 10px 0;
				    margin: 0 !important;
				}
				.${className} .messages-list--item.selected,
				.${className} .messages-list--item:hover {
					background: ${darker_text_color_1} !important;
				}
				.${className} .messages-list--item.active .time-date, 
				.${className} .messages-list--item.active h4, 
				.${className} .messages-list--item.active p {
					color: ${light_color} !important;
				}
				.${className} .hl_conversations--messages-list {
				    background: ${dark_color} !important;
				}
				.${className} .hl_conversations--message {
					background: ${darker_color};
				}
				.${className} .hl_conversations--message-body .message-input-wrap {
					background: ${dark_color};
				}
				.${className} .btn.btn-light {
					background: ${gradient_color};
					color: ${light_color} !important;
				}
				.${className} .btn.btn-light:active, 
				.${className} .btn.btn-light:focus, 
				.${className} .btn.btn-light:hover,
				.${className} .table_tag, .tag:hover {
					background: #353638 !important;
				}
				.${className} .aside-texts-infos .form-group>label {
				    color: ${light_color} !important;
				}
				.${className} .aside-texts-infos input {
				    border-color: ${{highlight_color_1}};
				    background: transparent;
				    color: ${light_color};
				}
				.${className} .hl_conversations--message-body .message-box {
				    background: ${dark_color} !important;
				    color: ${light_color};
				}
				.${className} .hl_conversations--message-body .message-box .use-template {
				    color: ${light_color};
				}
				.${className} .message-body--aside .btn-sched-wrap {
					border-top: 1px solid ${highlight_color_1};
				}
				.${className} .hl_conversations--wrap {
					background: ${darker_color};
				}
				.${className} .messages-list--text h4,
				.${className} .messages-list--text p {
            		color: ${light_color} !important;
				}
				.${className} .messages-list-header-actions .dropdown .dropdown-menu .dropdown-menu-filter .messages-filter-item .the-option input:checked+label,
				.${className} .messages-list-header-actions .dropdown .dropdown-menu .dropdown-menu-filter .messages-filter-item .the-option label {
            		color: ${light_color} !important;
				}
            	/* END CONVERSATION */


            	/* START PIPELINE */
            	.${className} #customers .date-time-picker .field .field-input, 
            	.${className} #dashboard .date-time-picker .field .field-input,
            	.${className} #opportunities .date-time-picker .field .field-input,
            	.${className} #stats-tab .date-time-picker .field .field-input {
            		background: ${gradient_color} !important;
            	}
            	.${className} #customers .date-time-picker .field .field-input::placeholder, 
            	.${className} #dashboard .date-time-picker .field .field-input::placeholder,
            	.${className} #opportunities .date-time-picker .field .field-input::placeholder,
            	.${className} #stats-tab .date-time-picker .field .field-input::placeholder,
            	.${className} #customers .date-time-picker .field .field-input,
            	.${className} #dashboard .date-time-picker .field .field-input,
            	.${className} #opportunities .date-time-picker .field .field-input,
            	.${className} #stats-tab .date-time-picker .field .field-input {
				    color: ${light_color} !important;
				    border: 0 !important;
				    text-decoration: none !important;
				}
				.${className} .form-control:disabled, 
				.${className} .form-control[readonly] {
				    background: ${light_color} !important;
				}
            	/* END PIPELINE */

            	/* START MARKETING */
            	.${className} .card-header:first-child {
            		background: ${dark_color};
            	}
            	.${className} .hl_create-campaign .new-event-day-item .event-card--top {
            		background: ${darker_color} !important;
            		border: unset !important;
            	}
            	.${className} .card-footer:last-child {
            		border: 0 !important;
            		border-top: 1px solid ${highlight_color_1} !important;
            		background: ${dark_color} !important;
            	}
            	.${className} .hl_create-campaign .new-event-day-item .event-card--bottom {
            		border: unset !important;
            	}
            	.${className} .hl_create-campaign .card-collapsing .card-header{
        		    border: unset !important;
				    border-bottom: 1px solid ${highlight_color_1} !important;
            	}
            	.${className} .hl_campaign-configuration .form-group>label,
            	.${className} .hl_customer-acquisition--table .table tbody tr td:first-child,
            	.${className} .justify-content-between,
            	.${className} .filters .totals, 
				.${className} .filters .totals label  {
            		color: ${light_color} !important;
            	}
            	.${className} .icon-pencil:before {
            		color: ${darker_text_color_1} !important;
            	}
            	.${className} .bg-white {
				    background: ${dark_color} !important;
				}
				.${className} .table-header {
					border-color: ${highlight_color_1};
				}
				.${className} form#_builder-form .form-builder--wrap {
				    background: ${dark_color} !important;
				}
				.${className} .form-builder--item label,
				.${className} .hl_form-builder--sidebar .style-group label {
				    color: ${light_color} !important;
				}
				.${className} .hl_form-builder--sidebar {
					border-color: ${highlight_color_1} !important;
					background: ${dark_color} !important;
				}
				.${className} .hl_form-builder--sidebar .nav-tabs.top-nav-wrapper-customfiel,
				.${className} .fields-settings-overlay,
				.${className} .hl_form-builder--sidebar .nav-tabs.top-nav-wrapper-customfield,
				.${className} .hl_edit-event-modal .modal-body  {
					background: ${dark_color} !important;
				}
				.${className} .hl_form-builder--sidebar .option-card-body,
				.${className} .hl_form-builder--sidebar .option-card-header {
					background: ${darker_color} !important;
					border-radius: 0 !important;
				}
				.${className} .hl_form-builder--sidebar .option-card-header {
					border-bottom: 1px solid ${highlight_color_1} !important;
				}
				.${className} .fields-settings-overlay .form-group>label {
				    color: ${light_color} !important;
				}
				.${className} .card-header.--no-right-padding {
					border-color: ${highlight_color_1};
				}
				.${className} .card-body.hl_campaign-configuration {
				    border-left: 1px solid ${highlight_color_1};
				    border-right: 1px solid ${highlight_color_1};
				}
				.${className} .hl_edit-event-modal-main .card .card-footer {
				    border: 1px solid ${highlight_color_1} !important;
				}
            	/* END MARKETING */

            	/* START REPORTING */
            	.${className} .card-group.--wide-gutter>.card,
            	.${className} .campaign_stats_cards .campaign_stats_card {
            		background: ${dark_color};
            	}
            	.${className} .col-lg-8 {
				    background-color: unset !important;
				}
				.${className} .card-header {
					border: unset;
				}
				.${className} .tui-full-calendar-week-container .tui-full-calendar-today {
					background: unset !important;
				}
				.${className} td.appointment-actions .form-control,
				.${className} td.appointment-actions .form-control:focus,
				.${className} td.appointment-actions .form-control:active {
				    background: transparent !important;
				    background-color: transparent !important;
				}
				.${className} .bootstrap-select>.btn.dropdown-toggle,
				.${className} .form-group .bootstrap-select, .form-horizontal .bootstrap-select, 
				.${className} .form-inline .bootstrap-select {
				    border: 0 !important;
				}
            	/* END REPORTING */


            	/* START CONTACTS */
            	.${className} .hl_contact-details-new--wrap .hl_contact-details-left {
				    background: ${dark_color};
				    border: 0;
				}
				.${className} .hl_contact-details-new--wrap .hl_contact-details-left .form-group label {
					color: ${light_color} !important;
				}
				.${className} .nav.nav-tabs {
				    border-color: ${highlight_color_1} !important;
				}
				.${className} .hl_contact-details-new--wrap .hl_contact-details-right {
				    background: ${dark_color};
				}
				.${className} .customerPageClass .hl_tasks-list .btn.dropdown-toggle {
					background: ${gradient_color};
				}
				.${className} .hl_tasks-list {
				    padding-top: 15px;
				}
				.${className} #additional-info label,
				.${className} .bootstrap-select .dropdown-toggle .filter-option-inner,
				.${className} .hl_controls .hl_controls--right .bootstrap-select>.btn.dropdown-toggle:after,
				.${className} .btn.btn-light i,
				.${className} .customized-header .header-underline ul.header-ul li {
					color: ${light_color} !important;
				}
				
            	/* END CONTACTS */

            	/* START FUNNELS */
            	.${className} .funnel {
        		    border-bottom: 1px solid ${highlight_color_1};
				    border-radius: 0 !important;
            	}
            	.${className} .funnel .name-updated b {
				    color: ${light_color} !important;
				}
				.${className} .funnel .name-updated p {
					color: ${highlight_color_1};
				}
				.${className} .hl_funnels--card-side,
				.${className} .hl_funnels--card-main {
					background: ${dark_color} !important;
					background-color: ${dark_color} !important;
				}
				.${className} .hl_funnels--steps-items li.active .title,
				.${className} .hl_funnels--steps-items li>.icon,
				.${className} .hl_funnels--steps-items li .title {
					background: ${dark_color} !important;
					background-color: ${dark_color} !important;
					border: 0 !important;
				    border: 1px solid ${darker_text_color_1} !important;
				}
				.${className} .hl_funnels--steps-items li .close {
					opacity: 1 !important;
				}
				.${className} .hl_funnels--steps-items li .title h5 {
					color: ${darker_text_color_1} !important;
				}
				.${className} .hl_funnels--publishing label,
				.${className} .hl_funnels--card label {
					color: ${light_color} !important;
				}
				.${className} .hl_funnels--card-side .launch-checklist {
					border-color: ${highlight_color_1} !important;
				}
				.${className} .hl_funnels--card {
					background: ${dark_color};
				}
            	/* END FUNNELS */

            	
            	/* START TRIGGERS */
            	.${className} .hl_triggers--item {
            		background: ${dark_color} !important;
            	}
            	.${className} .hl_rules--wrap .card .form-group label,
            	.${className} #back,
            	.${className} .hl_rules--wrap>.row .the-arrow .icon {
					color: ${light_color} !important;
				}
				.${className} .dropdown-menu .section-heading {
					background: ${darker_color} !important;
				}

            	/* END TRIGGERS */


            	/* START CHAT WIDGET */
            	.${className} .hl_wrapper-text-widget--root {
            		background: ${darker_color} !important;
            	}
            	.${className} .hl_wrapper-text-widget--root p {
				    color: ${light_color} !important;
				}
				.${className} .hl_wrapper-text-widget--root .hl_wrapper-text-widget--toggle .header-text,
				.${className} .hl_wrapper-text-widget--root .hl_wrapper-text-widget--toggle i,
				.${className} .hl_wrapper-text-widget--root .string-attr-input>label {
				    color: ${light_color} !important;
				}
				.${className} .hl_wrapper-text-widget--root .card-header:first-child {
				    border-bottom: 1px solid ${highlight_color_1} !important;
				}
				.${className} .custom-control-label {
				    color: ${highlight_color_1} !important;
				}
				.${className} .hl_wrapper-text-widget--root .mb-1 {
					border: unset !important;
				}
            	/* END TRIGGERS */


            	.${className} .hl_settings--main .card {
            		background: ${dark_color};
            	}
            	.${className} .hl_call--settings p, 
            	.${className} .hl_call--settings label, 
            	.${className} .hl_call--settings span,
            	.${className} .option>label,
            	.${className} .hl_settings--body label,
            	.${className} .hl_settings--nav li a,
				.${className} .card-integration p {
				    color: ${light_color} !important;
				}
				.${className} .hl_settings--body .form-group {
					color: ${highlight_color_1};
				}

				.${className} .hl_settings--header {
				    background: ${dark_color} !important;
				    border: 0;
				    box-shadow: unset;
				    border-bottom: 1px solid ${highlight_color_1} !important;
				}
				.${className} .hl_settings--nav li a:active, 
				.${className} .hl_settings--nav li a:focus, 
				.${className} .hl_settings--nav li a:hover {
					color: ${darker_text_color_1} !important;
				}
				.${className} .card-integration {
				    background: ${dark_color} !important;
				}
				.${className} .card.card--provider span {
				    color: ${light_color} !important;
				}
				.${className} .card.card--provider .card-body {
				    background: ${dark_color} !important;
				}
				.${className} .card-header.card-header--service,
				.${className} .calendar-settings .body .card-header--service {
					border: 1px solid ${highlight_color_1};
					border-radius: 0 !important;
				}
				.${className} .calendar-settings .body .card .title {
					opacity: 1 !important;
				}
				.${className} .calendar-settings .body .card--add-service {
					background: ${gradient_color} !important;
				}
				.${className} .calendar-settings .body .card--add-service i,
				.${className} .calendar-settings .body .card--add-service span,
				.${className} .modal-content--service section .title,
				.${className} .calendar-hour .day-of-week-name {
					color: ${light_color};
				}
				.${className} .calendar-hour {
				    border-color: ${highlight_color_1} !important;
				}
				.${className} .radio.radio--distribution.box-shadow-border-none label {
				    color: ${darker_color} !important;
				}
				.${className} .hl_edit-event-modal-main .card {
					background: unset !important;
				}









            	/* START MODAL */
            	.${className} .modal-content {
            		background: ${dark_color};
            	}
            	.${className} .modal-content .form-group>label,
            	.${className} .modal-content p {
            		color: ${light_color} !important;
            	}
            	.${className} .modal .modal-footer,
            	.${className} .modal .modal-header {
					border-color: ${highlight_color_1};
				}
            	/* END MODAL */


                .${className} .shortcuts-container::-webkit-scrollbar-track,
                .${className} .messages-list::-webkit-scrollbar-track,
                .${className} .messages-group::-webkit-scrollbar-track,
                .${className} .hl_form-builder--sidebar .style-wrap::-webkit-scrollbar-track,
                .${className} .hl_form-builder--sidebar .dragdrop-wrap::-webkit-scrollbar-track,
                .${className} .hl_contact-details-new--wrap .hl_contact-details-left .hl_contact-details-left-tabs .tab-content .tab-pane::-webkit-scrollbar-track,
                .${className} .hl_wrapper.nav-shrink .hl_wrapper--inner::-webkit-scrollbar-track
                 {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #383838;
                }
                .${className} .shortcuts-container::-webkit-scrollbar,
                .${className} .messages-list::-webkit-scrollbar,
                .${className} .messages-group::-webkit-scrollbar,
                .${className} .hl_form-builder--sidebar .style-wrap::-webkit-scrollbar,
                .${className} .hl_form-builder--sidebar .dragdrop-wrap::-webkit-scrollbar,
                .${className} .hl_contact-details-new--wrap .hl_contact-details-left .hl_contact-details-left-tabs .tab-content .tab-pane::-webkit-scrollbar,
                .${className} .hl_wrapper.nav-shrink .hl_wrapper--inner::-webkit-scrollbar {
                    width: 12px;
                    background-color: #383838;
                }
                .${className} .shortcuts-container::-webkit-scrollbar-thumb, 
                .${className} .messages-list::-webkit-scrollbar-thumb, 
                .${className} .messages-group::-webkit-scrollbar-thumb, 
                .${className} .hl_form-builder--sidebar .style-wrap::-webkit-scrollbar-thumb, 
                .${className} .hl_form-builder--sidebar .dragdrop-wrap::-webkit-scrollbar-thumb, 
                .${className} .hl_contact-details-new--wrap .hl_contact-details-left .hl_contact-details-left-tabs .tab-content .tab-pane::-webkit-scrollbar-thumb, 
                .${className} .hl_wrapper.nav-shrink .hl_wrapper--inner::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background: ${gradient_color};
                }
            `;

            console.log('1')

            if($('.styles').length > 0) return;
            console.log('2')

            $('#app').before('<div class="styles"></div>');

            $('html > body').find('.styles').html(`<style>${style}</style>`);
            setTimeout(() => {
            	$(".custom-color-scheme .hl_header a.btn.btn-circle.btn-primary.hl_header--copy-link").attr('style', '');
            }, 5000)
        }

    })
