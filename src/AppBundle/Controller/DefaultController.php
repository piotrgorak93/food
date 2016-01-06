<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller {
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request) {
        $restaurants = $this->getDoctrine()
            ->getRepository('AppBundle:Restaurant')
            ->findAll();
        return $this->render('default/index.html.twig', array(
            'restaurants' => $restaurants));
    }

    /**
     * @Route("/menu/{id}", name="menu")
     */
    public function getMenuAction(Request $request, $id) {
        $menu = $this->getDoctrine()
            ->getRepository('AppBundle:Menu')
            ->findBy(array('menuId' => $id));

        return $this->render('default/menu.html.twig', array(
            'menu' => $menu));
    }

    /**
     * @Route("/users/", name="users")
     */
    public function getUsersAction(Request $request) {
        $users = $this->getDoctrine()
            ->getRepository('AppBundle:Users')
            ->findBy(array(), array('userName' => 'ASC'));
        return $this->render('default/users.html.twig', array(
            'users' => $users));
    }
}
