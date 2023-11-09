INSERT INTO public.category (id, name) VALUES (1, 'Fashion');
INSERT INTO public.category (id, name) VALUES (2, 'Jewelry');
INSERT INTO public.category (id, name) VALUES (3, 'Shoes');
INSERT INTO public.category (id, name) VALUES (4, 'Home');
INSERT INTO public.category (id, name) VALUES (5, 'Electronics');
INSERT INTO public.category (id, name) VALUES (6, 'Mobile');
INSERT INTO public.category (id, name) VALUES (7, 'Computer');
INSERT INTO public.category(id, name, parent_category_id) VALUES (10, 'Handbags', 1);
INSERT INTO public.category(id, name, parent_category_id) VALUES (11, 'Glasses', 1);
-- INSERT INTO public.category(id, name, parent_category_id) VALUES (12, 'Perfume', 1);
INSERT INTO public.category(id, name, parent_category_id) VALUES (13, 'Makeup', 1);
INSERT INTO public.category(id, name, parent_category_id) VALUES (14, 'Rings', 2);
-- INSERT INTO public.category(id, name, parent_category_id) VALUES (15, 'Earrings', 2);
-- INSERT INTO public.category(id, name, parent_category_id) VALUES (16, 'Bracelets', 2);
INSERT INTO public.category(id, name, parent_category_id) VALUES (17, 'Necklaces', 2);
INSERT INTO public.category(id, name, parent_category_id) VALUES (18, 'Men Shoes', 3);
INSERT INTO public.category(id, name, parent_category_id) VALUES (19, 'Women Shoes', 3);
INSERT INTO public.category(id, name, parent_category_id) VALUES (20, 'Wall Art', 4);
INSERT INTO public.category(id, name, parent_category_id) VALUES (21, 'Furniture', 4);
INSERT INTO public.category(id, name, parent_category_id) VALUES (22, 'Cameras', 5);
-- INSERT INTO public.category(id, name, parent_category_id) VALUES (23, 'Headphones', 5);
-- INSERT INTO public.category(id, name, parent_category_id) VALUES (24, 'Televisions', 5);
INSERT INTO public.category(id, name, parent_category_id) VALUES (25, 'Phone Cases', 6);
INSERT INTO public.category(id, name, parent_category_id) VALUES (26, 'Laptops', 7);



