--
-- PostgreSQL database cluster dump
--

-- Started on 2025-07-13 21:08:52

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:LRhITxBPF/IXa8raf9pzYQ==$zalPvz4NGopBp2RkYS2fXdtzfCfWpV0Y99lELa58+/c=:K/qLa0qskjwIuGb1e5LF7gqqPGx0sPHVbQiN0oIA1y4=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-13 21:08:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-07-13 21:08:53

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-13 21:08:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16791)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario text NOT NULL,
    email text,
    hash_contrasena text NOT NULL,
    rol text DEFAULT 'mecanico'::text NOT NULL,
    nombre text,
    apellido text,
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16790)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4695 (class 2604 OID 16794)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4851 (class 0 OID 16791)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre_usuario, email, hash_contrasena, rol, nombre, apellido, activo, fecha_creacion) FROM stdin;
1	dfrancop	davidfrancop@icloud.com	$2b$10$sF/u/vKhrXITZDIm28TL8OTnx7tJOugBn.MB6tVnAe0Yf0izn9NH.	Administrador	David	Franco	t	2025-06-13 19:10:12.291209
\.


--
-- TOC entry 4858 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, true);


--
-- TOC entry 4700 (class 2606 OID 16805)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4702 (class 2606 OID 16803)
-- Name: usuarios usuarios_nombre_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_nombre_usuario_key UNIQUE (nombre_usuario);


--
-- TOC entry 4704 (class 2606 OID 16801)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


-- Completed on 2025-07-13 21:08:54

--
-- PostgreSQL database dump complete
--

--
-- Database "totalcar" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-13 21:08:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4946 (class 1262 OID 16387)
-- Name: totalcar; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE totalcar WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE totalcar OWNER TO postgres;

\connect totalcar

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 24811)
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    client_id integer NOT NULL,
    vehicle_id integer NOT NULL,
    start timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    reason text NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24810)
-- Name: appointments_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_appointment_id_seq OWNER TO postgres;

--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 231
-- Name: appointments_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_id_seq OWNED BY public.appointments.appointment_id;


--
-- TOC entry 220 (class 1259 OID 24635)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    client_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    client_type text NOT NULL,
    company_name text,
    registration_number text,
    email text NOT NULL,
    phone_number text NOT NULL,
    street text NOT NULL,
    postal_code text NOT NULL,
    city text NOT NULL,
    region text,
    country text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    house_number text,
    company_id integer,
    dni text,
    CONSTRAINT clients_client_type_check CHECK ((client_type = ANY (ARRAY['individual'::text, 'company'::text])))
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24634)
-- Name: clients_client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_client_id_seq OWNER TO postgres;

--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 219
-- Name: clients_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_client_id_seq OWNED BY public.clients.client_id;


--
-- TOC entry 224 (class 1259 OID 24728)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    company_id integer NOT NULL,
    name text NOT NULL,
    registration_number text,
    email text NOT NULL,
    phone text,
    contact_person text,
    street text NOT NULL,
    house_number text,
    postal_code text NOT NULL,
    city text NOT NULL,
    region text,
    country text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24727)
-- Name: companies_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companies_company_id_seq OWNER TO postgres;

--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 223
-- Name: companies_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_company_id_seq OWNED BY public.companies.company_id;


--
-- TOC entry 228 (class 1259 OID 24775)
-- Name: inspection_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_templates (
    template_id integer NOT NULL,
    name text NOT NULL,
    description text,
    points jsonb NOT NULL
);


ALTER TABLE public.inspection_templates OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24774)
-- Name: inspection_templates_template_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_templates_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_templates_template_id_seq OWNER TO postgres;

--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 227
-- Name: inspection_templates_template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_templates_template_id_seq OWNED BY public.inspection_templates.template_id;


--
-- TOC entry 230 (class 1259 OID 24784)
-- Name: pre_work_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pre_work_orders (
    pre_work_order_id integer NOT NULL,
    vehicle_id integer NOT NULL,
    template_id integer NOT NULL,
    answers jsonb NOT NULL,
    additional_notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    note_from_reception text,
    status text DEFAULT 'pending_assignment'::text,
    assigned_to integer
);


ALTER TABLE public.pre_work_orders OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24783)
-- Name: pre_work_orders_pre_work_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pre_work_orders_pre_work_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pre_work_orders_pre_work_order_id_seq OWNER TO postgres;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 229
-- Name: pre_work_orders_pre_work_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pre_work_orders_pre_work_order_id_seq OWNED BY public.pre_work_orders.pre_work_order_id;


--
-- TOC entry 218 (class 1259 OID 24595)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username text NOT NULL,
    password_hash text NOT NULL,
    role text NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24594)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 222 (class 1259 OID 24647)
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    vehicle_id integer NOT NULL,
    client_id integer NOT NULL,
    plate text NOT NULL,
    vin text NOT NULL,
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    hsn character(4) NOT NULL,
    tsn character(3) NOT NULL,
    fuel_type text NOT NULL,
    vehicle_type text NOT NULL,
    drive text NOT NULL,
    transmission text NOT NULL,
    km integer NOT NULL,
    tuv_month integer NOT NULL,
    tuv_year integer NOT NULL,
    registration_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_service_date date,
    company_id integer,
    CONSTRAINT vehicles_tuv_month_check CHECK (((tuv_month >= 1) AND (tuv_month <= 12)))
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24646)
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicles_vehicle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicles_vehicle_id_seq OWNER TO postgres;

--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 221
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicles_vehicle_id_seq OWNED BY public.vehicles.vehicle_id;


--
-- TOC entry 226 (class 1259 OID 24748)
-- Name: work_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.work_orders (
    work_order_id integer NOT NULL,
    client_id integer NOT NULL,
    vehicle_id integer NOT NULL,
    company_id integer,
    description text NOT NULL,
    status text DEFAULT 'open'::text NOT NULL,
    scheduled_date date,
    completed_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.work_orders OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24747)
-- Name: work_orders_work_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.work_orders_work_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.work_orders_work_order_id_seq OWNER TO postgres;

--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 225
-- Name: work_orders_work_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.work_orders_work_order_id_seq OWNED BY public.work_orders.work_order_id;


--
-- TOC entry 4744 (class 2604 OID 24814)
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_appointment_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 24638)
-- Name: clients client_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN client_id SET DEFAULT nextval('public.clients_client_id_seq'::regclass);


--
-- TOC entry 4735 (class 2604 OID 24731)
-- Name: companies company_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN company_id SET DEFAULT nextval('public.companies_company_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 24778)
-- Name: inspection_templates template_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_templates ALTER COLUMN template_id SET DEFAULT nextval('public.inspection_templates_template_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 24787)
-- Name: pre_work_orders pre_work_order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_work_orders ALTER COLUMN pre_work_order_id SET DEFAULT nextval('public.pre_work_orders_pre_work_order_id_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 24598)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 24650)
-- Name: vehicles vehicle_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles ALTER COLUMN vehicle_id SET DEFAULT nextval('public.vehicles_vehicle_id_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 24751)
-- Name: work_orders work_order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_orders ALTER COLUMN work_order_id SET DEFAULT nextval('public.work_orders_work_order_id_seq'::regclass);


--
-- TOC entry 4940 (class 0 OID 24811)
-- Dependencies: 232
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (appointment_id, client_id, vehicle_id, start, end_time, reason) FROM stdin;
\.


--
-- TOC entry 4928 (class 0 OID 24635)
-- Dependencies: 220
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (client_id, first_name, last_name, client_type, company_name, registration_number, email, phone_number, street, postal_code, city, region, country, created_at, house_number, company_id, dni) FROM stdin;
4	David	Franco	individual	\N	\N	dfrancop@gmail.com	01745396548	Kemptener Straße	81475	Múnich	Baviera	Alemania	2025-07-05 21:20:49.020381	17	\N	55305339E
\.


--
-- TOC entry 4932 (class 0 OID 24728)
-- Dependencies: 224
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (company_id, name, registration_number, email, phone, contact_person, street, house_number, postal_code, city, region, country, created_at) FROM stdin;
\.


--
-- TOC entry 4936 (class 0 OID 24775)
-- Dependencies: 228
-- Data for Name: inspection_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_templates (template_id, name, description, points) FROM stdin;
1	Basic	Quick inspection with essential safety checks.	[{"key": "engine_oil", "label": "Check engine oil level"}, {"key": "coolant_level", "label": "Check coolant level"}, {"key": "brake_fluid", "label": "Check brake fluid level"}, {"key": "battery_condition", "label": "Inspect battery condition"}, {"key": "tire_pressure", "label": "Check tire pressure"}, {"key": "tire_tread", "label": "Inspect tire tread depth"}, {"key": "headlights", "label": "Test headlights"}, {"key": "brake_lights", "label": "Test brake lights"}, {"key": "turn_signals", "label": "Test turn signals"}, {"key": "horn_function", "label": "Check horn function"}, {"key": "windshield", "label": "Inspect windshield for cracks"}, {"key": "wipers", "label": "Check windshield wipers"}, {"key": "seat_belts", "label": "Check seat belts"}, {"key": "dashboard_lights", "label": "Check warning lights on dashboard"}, {"key": "license_plate", "label": "Verify license plate visibility and fixation"}]
2	Standard	Expanded inspection including suspension, steering and more systems.	[{"key": "engine_oil", "label": "Check engine oil level"}, {"key": "coolant_level", "label": "Check coolant level"}, {"key": "brake_fluid", "label": "Check brake fluid level"}, {"key": "battery_condition", "label": "Inspect battery condition"}, {"key": "tire_pressure", "label": "Check tire pressure"}, {"key": "tire_tread", "label": "Inspect tire tread depth"}, {"key": "headlights", "label": "Test headlights"}, {"key": "brake_lights", "label": "Test brake lights"}, {"key": "turn_signals", "label": "Test turn signals"}, {"key": "horn_function", "label": "Check horn function"}, {"key": "windshield", "label": "Inspect windshield for cracks"}, {"key": "wipers", "label": "Check windshield wipers"}, {"key": "seat_belts", "label": "Check seat belts"}, {"key": "dashboard_lights", "label": "Check warning lights on dashboard"}, {"key": "license_plate", "label": "Verify license plate visibility and fixation"}, {"key": "suspension_front", "label": "Inspect front suspension components"}, {"key": "suspension_rear", "label": "Inspect rear suspension components"}, {"key": "ball_joints", "label": "Check ball joints"}, {"key": "tie_rods", "label": "Inspect tie rods"}, {"key": "steering_fluid", "label": "Check steering fluid level"}, {"key": "steering_gearbox", "label": "Inspect steering gearbox for leaks"}, {"key": "muffler", "label": "Inspect muffler and exhaust pipe"}, {"key": "exhaust_leaks", "label": "Check for exhaust leaks"}, {"key": "transmission_fluid", "label": "Check transmission fluid level"}, {"key": "cv_joints", "label": "Inspect CV joints and boots"}, {"key": "a_c_operation", "label": "Test air conditioning operation"}, {"key": "rear_defroster", "label": "Check rear window defroster"}, {"key": "fog_lights", "label": "Test fog lights"}, {"key": "reverse_lights", "label": "Test reverse lights"}, {"key": "power_windows", "label": "Test power window operation"}, {"key": "power_locks", "label": "Test power door locks"}, {"key": "interior_lights", "label": "Check interior lights"}, {"key": "radio_function", "label": "Test radio and speakers"}, {"key": "mirrors", "label": "Inspect mirrors and adjustments"}, {"key": "parking_brake", "label": "Test parking brake"}, {"key": "brake_lines", "label": "Inspect brake lines and hoses"}, {"key": "coolant_hoses", "label": "Check coolant hoses for leaks"}, {"key": "serpentine_belt", "label": "Inspect serpentine/accessory belt"}, {"key": "filters", "label": "Inspect air and cabin filters"}, {"key": "battery_mount", "label": "Check battery secure mounting"}, {"key": "fluid_leaks", "label": "Look for visible fluid leaks"}, {"key": "hood_latch", "label": "Test hood latch and cable"}, {"key": "trunk_latch", "label": "Test trunk latch and operation"}]
3	Complete	Full 150+ point inspection including all mechanical, electrical and EV-specific checks.	[{"key": "manufacturer_plate", "label": "Manufacturer plate"}, {"key": "registration_vs_permit", "label": "Registration vs permit"}, {"key": "vin_vs_permit", "label": "Vin vs permit"}, {"key": "inspection_validity", "label": "Inspection validity"}, {"key": "regulatory_stickers", "label": "Regulatory stickers"}, {"key": "brake_leaks", "label": "Brake leaks"}, {"key": "brake_hoses", "label": "Brake hoses"}, {"key": "discs_drums", "label": "Discs drums"}, {"key": "pads_shoes", "label": "Pads shoes"}, {"key": "handbrake", "label": "Handbrake"}, {"key": "brake_fluid", "label": "Brake fluid"}, {"key": "brake_assist_abs", "label": "Brake assist abs"}, {"key": "steering_leaks", "label": "Steering leaks"}, {"key": "steering_boots", "label": "Steering boots"}, {"key": "power_steering_fluid", "label": "Power steering fluid"}, {"key": "steering_pipes", "label": "Steering pipes"}, {"key": "drive_shafts", "label": "Drive shafts"}, {"key": "cv_boots", "label": "Cv boots"}, {"key": "suspension_arms", "label": "Suspension arms"}, {"key": "ball_joints", "label": "Ball joints"}, {"key": "bearings", "label": "Bearings"}, {"key": "front_shocks", "label": "Front shocks"}, {"key": "rear_shocks", "label": "Rear shocks"}, {"key": "rims_condition", "label": "Rims condition"}, {"key": "bolt_tightness", "label": "Bolt tightness"}, {"key": "spare_wheel", "label": "Spare wheel"}, {"key": "tire_compliance", "label": "Tire compliance"}, {"key": "tire_condition", "label": "Tire condition"}, {"key": "tire_pressure", "label": "Tire pressure"}, {"key": "battery_condition", "label": "Battery condition"}, {"key": "battery_mounting", "label": "Battery mounting"}, {"key": "battery_charge_level", "label": "Battery charge level"}, {"key": "battery_test", "label": "Battery test"}, {"key": "headlights", "label": "Headlights"}, {"key": "low_beam", "label": "Low beam"}, {"key": "high_beam", "label": "High beam"}, {"key": "fog_lights_front_rear", "label": "Fog lights front rear"}, {"key": "turn_signals", "label": "Turn signals"}, {"key": "hazard_lights", "label": "Hazard lights"}, {"key": "brake_lights", "label": "Brake lights"}, {"key": "reverse_lights", "label": "Reverse lights"}, {"key": "rear_lights", "label": "Rear lights"}, {"key": "interior_lighting", "label": "Interior lighting"}, {"key": "glovebox_light", "label": "Glovebox light"}, {"key": "trunk_light", "label": "Trunk light"}, {"key": "usb_socket", "label": "Usb socket"}, {"key": "horn_function", "label": "Horn function"}, {"key": "wiper_operation", "label": "Wiper operation"}, {"key": "wiper_blades", "label": "Wiper blades"}, {"key": "washer_fluid_level", "label": "Washer fluid level"}, {"key": "ac_operation", "label": "Ac operation"}, {"key": "ac_controls", "label": "Ac controls"}, {"key": "rear_defrost", "label": "Rear defrost"}, {"key": "radio_function", "label": "Radio function"}, {"key": "multimedia_reset", "label": "Multimedia reset"}, {"key": "dashboard_warnings", "label": "Dashboard warnings"}, {"key": "ecu_diagnostic", "label": "Ecu diagnostic"}, {"key": "service_interval_reset", "label": "Service interval reset"}, {"key": "navigation_system", "label": "Navigation system"}, {"key": "parking_assist", "label": "Parking assist"}, {"key": "heated_seats", "label": "Heated seats"}, {"key": "12v_socket", "label": "12v socket"}, {"key": "central_locking", "label": "Central locking"}, {"key": "oil_change", "label": "Oil change"}, {"key": "oil_filter", "label": "Oil filter"}, {"key": "oil_level_after_change", "label": "Oil level after change"}, {"key": "engine_leaks", "label": "Engine leaks"}, {"key": "manufacturer_stickers", "label": "Manufacturer stickers"}, {"key": "spark_plugs_or_injectors", "label": "Spark plugs or injectors"}, {"key": "air_filter", "label": "Air filter"}, {"key": "belt_condition", "label": "Belt condition"}, {"key": "timing_belt_accessory_belt", "label": "Timing belt accessory belt"}, {"key": "gearbox_operation", "label": "Gearbox operation"}, {"key": "gearbox_oil_change", "label": "Gearbox oil change"}, {"key": "gearbox_leaks", "label": "Gearbox leaks"}, {"key": "gear_selector", "label": "Gear selector"}, {"key": "clutch_operation", "label": "Clutch operation"}, {"key": "clutch_pedal_play", "label": "Clutch pedal play"}, {"key": "clutch_hydraulic_leak", "label": "Clutch hydraulic leak"}, {"key": "fuel_filter", "label": "Fuel filter"}, {"key": "fuel_pump", "label": "Fuel pump"}, {"key": "fuel_cap", "label": "Fuel cap"}, {"key": "dpf_filter", "label": "Dpf filter"}, {"key": "preheating_system", "label": "Preheating system"}, {"key": "intake_exhaust_manifold", "label": "Intake exhaust manifold"}, {"key": "adblue_level", "label": "Adblue level"}, {"key": "coolant_hoses", "label": "Coolant hoses"}, {"key": "coolant_level", "label": "Coolant level"}, {"key": "exhaust_pipes", "label": "Exhaust pipes"}, {"key": "expansion_tank", "label": "Expansion tank"}, {"key": "catalytic_converter", "label": "Catalytic converter"}, {"key": "muffler", "label": "Muffler"}, {"key": "pedals_response", "label": "Pedals response"}, {"key": "brake_pedal", "label": "Brake pedal"}, {"key": "clutch_pedal", "label": "Clutch pedal"}, {"key": "accelerator_pedal", "label": "Accelerator pedal"}, {"key": "trunk_release", "label": "Trunk release"}, {"key": "hood_release", "label": "Hood release"}, {"key": "sunroof_switch", "label": "Sunroof switch"}, {"key": "steering_wheel", "label": "Steering wheel"}, {"key": "steering_controls", "label": "Steering controls"}, {"key": "cruise_control", "label": "Cruise control"}, {"key": "engine_start", "label": "Engine start"}, {"key": "wheel_balance", "label": "Wheel balance"}, {"key": "floor_mats", "label": "Floor mats"}, {"key": "windshield_condition", "label": "Windshield condition"}, {"key": "rearview_mirror", "label": "Rearview mirror"}, {"key": "side_mirrors", "label": "Side mirrors"}, {"key": "windows", "label": "Windows"}, {"key": "seat_adjustments", "label": "Seat adjustments"}, {"key": "door_latches", "label": "Door latches"}, {"key": "door_hinges", "label": "Door hinges"}, {"key": "door_locks", "label": "Door locks"}, {"key": "lock_barrels", "label": "Lock barrels"}, {"key": "lock_actuators", "label": "Lock actuators"}, {"key": "seat_belts", "label": "Seat belts"}, {"key": "child_safety_locks", "label": "Child safety locks"}, {"key": "isofix_mounts", "label": "Isofix mounts"}, {"key": "storage_compartments", "label": "Storage compartments"}, {"key": "center_armrest", "label": "Center armrest"}, {"key": "headrests", "label": "Headrests"}, {"key": "rear_shelf", "label": "Rear shelf"}, {"key": "jack_and_tools", "label": "Jack and tools"}, {"key": "chassis", "label": "Chassis"}, {"key": "body_panels", "label": "Body panels"}, {"key": "engine_mounts", "label": "Engine mounts"}, {"key": "corrosion", "label": "Corrosion"}, {"key": "side_mirrors_body", "label": "Side mirrors body"}, {"key": "antenna", "label": "Antenna"}, {"key": "exterior_trims", "label": "Exterior trims"}, {"key": "bumpers", "label": "Bumpers"}, {"key": "vinyl_markings", "label": "Vinyl markings"}, {"key": "plate_readability", "label": "Plate readability"}, {"key": "plate_condition", "label": "Plate condition"}, {"key": "plate_mounting", "label": "Plate mounting"}, {"key": "plate_lighting", "label": "Plate lighting"}, {"key": "accessories_presence", "label": "Accessories presence"}, {"key": "accessories_function", "label": "Accessories function"}, {"key": "charging_flap", "label": "Charging flap"}, {"key": "charging_port", "label": "Charging port"}, {"key": "charging_cable", "label": "Charging cable"}, {"key": "optional_cable", "label": "Optional cable"}, {"key": "aux_heating", "label": "Aux heating"}, {"key": "battery_charge_status", "label": "Battery charge status"}, {"key": "charge_test_drive", "label": "Charge test drive"}, {"key": "charge_cycles", "label": "Charge cycles"}, {"key": "traction_battery", "label": "Traction battery"}, {"key": "power_connector", "label": "Power connector"}, {"key": "safety_cutoff", "label": "Safety cutoff"}, {"key": "control_connector", "label": "Control connector"}, {"key": "min_charge_before_delivery", "label": "Min charge before delivery"}, {"key": "drive_reducer", "label": "Drive reducer"}]
\.


--
-- TOC entry 4938 (class 0 OID 24784)
-- Dependencies: 230
-- Data for Name: pre_work_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pre_work_orders (pre_work_order_id, vehicle_id, template_id, answers, additional_notes, created_at, note_from_reception, status, assigned_to) FROM stdin;
\.


--
-- TOC entry 4926 (class 0 OID 24595)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password_hash, role, email, first_name, last_name) FROM stdin;
1	dfrancop	$2b$10$/Jvx9DsdP.Rx46ZYZVsoNOlx0PuwryV2i.LvB43q6Qkqpkq.w8Adq	admin	dfrancop@gmail.com	David	Franco
3	dignacio	$2b$10$bWcTsjv0nh7h2/tkOD2KUOFabivIlVg8y1B.r.XkRp91fTJQbBZKW	mechanic	dignacio@gmail.com	David Ignacio	Franco
2	claudiaoliviero	$2b$10$nOMiOWlRS5ZfIip8TjK8ce6bIpRkmNlGLWqy9Ein.ksh7O56lO092	frontdesk	claudiaoliviero@gmail.com	Claudia	Oliviero
\.


--
-- TOC entry 4930 (class 0 OID 24647)
-- Dependencies: 222
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicles (vehicle_id, client_id, plate, vin, make, model, year, hsn, tsn, fuel_type, vehicle_type, drive, transmission, km, tuv_month, tuv_year, registration_date, created_at, last_service_date, company_id) FROM stdin;
8	4	MUCD2016	JHMGP1830DS205146	Honda	Jazz	2013	7100	ABV	Hybrid	Sedan	FWD	Automatic	105000	8	2026	2024-09-16	2025-07-05 21:24:52.378947	\N	\N
\.


--
-- TOC entry 4934 (class 0 OID 24748)
-- Dependencies: 226
-- Data for Name: work_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.work_orders (work_order_id, client_id, vehicle_id, company_id, description, status, scheduled_date, completed_date, created_at) FROM stdin;
\.


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 231
-- Name: appointments_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_id_seq', 1, false);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 219
-- Name: clients_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_client_id_seq', 4, true);


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 223
-- Name: companies_company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_company_id_seq', 1, false);


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 227
-- Name: inspection_templates_template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_templates_template_id_seq', 3, true);


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 229
-- Name: pre_work_orders_pre_work_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pre_work_orders_pre_work_order_id_seq', 1, false);


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 221
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicles_vehicle_id_seq', 8, true);


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 225
-- Name: work_orders_work_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.work_orders_work_order_id_seq', 1, false);


--
-- TOC entry 4768 (class 2606 OID 24818)
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);


--
-- TOC entry 4752 (class 2606 OID 24645)
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);


--
-- TOC entry 4760 (class 2606 OID 24736)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (company_id);


--
-- TOC entry 4764 (class 2606 OID 24782)
-- Name: inspection_templates inspection_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_templates
    ADD CONSTRAINT inspection_templates_pkey PRIMARY KEY (template_id);


--
-- TOC entry 4766 (class 2606 OID 24792)
-- Name: pre_work_orders pre_work_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_work_orders
    ADD CONSTRAINT pre_work_orders_pkey PRIMARY KEY (pre_work_order_id);


--
-- TOC entry 4748 (class 2606 OID 24602)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4750 (class 2606 OID 24604)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4754 (class 2606 OID 24656)
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 4756 (class 2606 OID 24658)
-- Name: vehicles vehicles_plate_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_plate_key UNIQUE (plate);


--
-- TOC entry 4758 (class 2606 OID 24660)
-- Name: vehicles vehicles_vin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_vin_key UNIQUE (vin);


--
-- TOC entry 4762 (class 2606 OID 24757)
-- Name: work_orders work_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_orders
    ADD CONSTRAINT work_orders_pkey PRIMARY KEY (work_order_id);


--
-- TOC entry 4778 (class 2606 OID 24819)
-- Name: appointments appointments_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id);


--
-- TOC entry 4779 (class 2606 OID 24824)
-- Name: appointments appointments_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(vehicle_id);


--
-- TOC entry 4769 (class 2606 OID 24737)
-- Name: clients clients_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id);


--
-- TOC entry 4775 (class 2606 OID 24805)
-- Name: pre_work_orders pre_work_orders_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_work_orders
    ADD CONSTRAINT pre_work_orders_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(user_id);


--
-- TOC entry 4776 (class 2606 OID 24798)
-- Name: pre_work_orders pre_work_orders_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_work_orders
    ADD CONSTRAINT pre_work_orders_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.inspection_templates(template_id);


--
-- TOC entry 4777 (class 2606 OID 24793)
-- Name: pre_work_orders pre_work_orders_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pre_work_orders
    ADD CONSTRAINT pre_work_orders_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(vehicle_id);


--
-- TOC entry 4770 (class 2606 OID 24661)
-- Name: vehicles vehicles_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id) ON DELETE CASCADE;


--
-- TOC entry 4771 (class 2606 OID 24742)
-- Name: vehicles vehicles_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id);


--
-- TOC entry 4772 (class 2606 OID 24758)
-- Name: work_orders work_orders_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_orders
    ADD CONSTRAINT work_orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id) ON DELETE CASCADE;


--
-- TOC entry 4773 (class 2606 OID 24768)
-- Name: work_orders work_orders_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_orders
    ADD CONSTRAINT work_orders_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id);


--
-- TOC entry 4774 (class 2606 OID 24763)
-- Name: work_orders work_orders_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_orders
    ADD CONSTRAINT work_orders_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(vehicle_id) ON DELETE CASCADE;


-- Completed on 2025-07-13 21:08:54

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-07-13 21:08:54

--
-- PostgreSQL database cluster dump complete
--

