package com.darauli.pdp.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.darauli.pdp.entity.Registration;

@Repository
public class LoginDao {

	
	@Autowired
	private SessionFactory factory;

	
	public Registration login (String username, String password) {
		Registration reg = null;
		Session session =null;
		try {
			session = factory.openSession();
			Criteria criteria = session.createCriteria(Registration.class);
			criteria.add(Restrictions.eq("username", username));
			criteria.add(Restrictions.eq("password",password));
			criteria.add(Restrictions.eq("invalid_flag", 'N'));
			criteria.add(Restrictions.eq("delete_flag", 'N'));
			List<Registration> list = (List<Registration>) criteria.list();
			if(list != null && !list.isEmpty()) {
				reg = (Registration)list.get(0);
				}
		}catch (Exception ex) {
		}finally {
			session.close();
		}
		return reg;
	}


	public int registerUser(Registration user) {
		Session session =null;
		Transaction tx = null;
		boolean flag =false;
		int i =0;
		try {
			
			session = factory.openSession();
			tx = session.beginTransaction();
			 i =	(Integer)session.save(user);
			tx.commit();
				
		}catch (Exception ex) {
			tx.rollback();
			ex.printStackTrace();
		}finally {
			session.close();
		}
		return i;
	}
	
	
}
