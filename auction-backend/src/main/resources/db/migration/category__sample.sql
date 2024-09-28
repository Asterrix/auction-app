INSERT INTO public.category (id, name) VALUES (1, 'Fashion');
INSERT INTO public.category (id, name) VALUES (2, 'Jewelry');
INSERT INTO public.category (id, name) VALUES (3, 'Shoes');
INSERT INTO public.category (id, name) VALUES (4, 'Home');
INSERT INTO public.category (id, name) VALUES (5, 'Electronics');
INSERT INTO public.category (id, name) VALUES (6, 'Mobile');
INSERT INTO public.category (id, name) VALUES (7, 'Computer');
INSERT INTO public.category(id, name, parent_category_id) VALUES (8, 'Handbags', 1);
INSERT INTO public.category(id, name, parent_category_id) VALUES (9, 'Glasses', 1);
INSERT INTO public.category(id, name, parent_category_id) VALUES (10, 'Makeup', 1);
INSERT INTO public.category(id, name, parent_category_id) VALUES (11, 'Rings', 2);
INSERT INTO public.category(id, name, parent_category_id) VALUES (12, 'Necklaces', 2);
INSERT INTO public.category(id, name, parent_category_id) VALUES (13, 'Men Shoes', 3);
INSERT INTO public.category(id, name, parent_category_id) VALUES (14, 'Women Shoes', 3);
INSERT INTO public.category(id, name, parent_category_id) VALUES (15, 'Wall Art', 4);
INSERT INTO public.category(id, name, parent_category_id) VALUES (16, 'Furniture', 4);
INSERT INTO public.category(id, name, parent_category_id) VALUES (17, 'Cameras', 5);
INSERT INTO public.category(id, name, parent_category_id) VALUES (18, 'Phone Cases', 6);
INSERT INTO public.category(id, name, parent_category_id) VALUES (19, 'Laptops', 7);



